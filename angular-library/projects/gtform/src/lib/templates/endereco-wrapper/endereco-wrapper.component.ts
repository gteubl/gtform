import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime, map } from 'rxjs/operators';

import { BehaviorSubject, filter, switchMap, takeWhile } from 'rxjs';


import { EnderecoDto, LocalService } from 'src/api';
import { AppMessageService } from 'src/core/root-services/app-message.service';
import { EnderecoWrapperRootService } from 'src/library/templates/endereco-wrapper/endereco-wrapper-root.service';
import { FormOption } from 'src/library/utils/form-option';
import { mergeWithNonEmptyStringOverrides, nameof } from 'src/library/utils/utils';

@Component({
  selector: 'form-endereco-wrapper',
  templateUrl: './endereco-wrapper.component.html',
  styleUrl: './endereco-wrapper.component.scss'

})
export class EnderecoWrapperComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public endereco: EnderecoDto = {
    cep: null,
    logradouro: null,
    bairro: null,
    numero: null,
    complemento: null,
    uf: undefined,
    cidade: undefined
  };
  @Input() public showUfAndCidade: boolean = false;

  @Input() public isReadOnly: boolean = true;
  @Input() public autoComplete: boolean = true;
  @Input() public showBorder: boolean = true;

  @Output() public enderecoChange = new EventEmitter<EnderecoDto>();
  public ufOptions$ = this.enderecoWrapperRootService.getUfOptions;
  private isAlive: boolean = true;
  private cidadeOptions = new BehaviorSubject<FormOption[]>([]);
  public cidadeOptions$ = this.cidadeOptions.asObservable();
  //FormGroups
  public formGroup: FormGroup = new FormGroup(
    {
      [nameof<EnderecoDto>('cep')]: new FormControl(null, Validators.required),
      [nameof<EnderecoDto>('logradouro')]: new FormControl(null, Validators.required),
      [nameof<EnderecoDto>('bairro')]: new FormControl(null),
      [nameof<EnderecoDto>('numero')]: new FormControl(null, Validators.required),
      [nameof<EnderecoDto>('complemento')]: new FormControl(null),
      [nameof<EnderecoDto>('uf')]: new FormControl(null, Validators.required),
      [nameof<EnderecoDto>('cidade')]: new FormControl(null, Validators.required)
    }
  );

  public constructor(private enderecoWrapperRootService: EnderecoWrapperRootService,
                     private localService: LocalService,
                     private messageService: AppMessageService
  ) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['endereco'] && changes['endereco'].currentValue) {
      this.formGroup.patchValue(this.endereco, { emitEvent: false });
    }
  }

  private dispatchEmitEndereco(): void {
    this.enderecoChange.emit(this.formGroup.getRawValue());
  }

  public ngOnInit(): void {
    this.formGroup.get('uf')?.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        filter(() => !this.isReadOnly),
        debounceTime(500)
      )
      .subscribe(() => this.dispatchCleanUpForm()
      );

    this.formGroup.get('cep')?.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        filter(() => !this.isReadOnly && this.formGroup.touched && this.autoComplete),
        debounceTime(500),
        map((cep) => {
          const onlyNumbers = cep?.replace(/\D/g, '');
          const cepLength = onlyNumbers?.length ?? 0;
          if (cepLength === 8) {
            return cep;
          }
          return null;
        }),
        filter((cep) => cep !== null),
        switchMap((cep) => this.localService.v1LocalGetEnderecoByCepCepGet(cep)),
        filter((endereco) => endereco !== null)
      ).subscribe((endereco) => {
        this.patchEndereco(endereco);
      });


    this.formGroup.valueChanges
      .pipe(
        takeWhile(() => this.isAlive),
        //        filter(() => this.formGroup.dirty),
        debounceTime(100)
      ).subscribe(() => {
        this.dispatchEmitEndereco();
      });
  }
  public ngOnDestroy(): void {
    this.isAlive = false;
  }

  private dispatchCleanUpForm(): void {
    //   this.formGroup.reset();
    //  this.formGroup.get('uf')?.setValue(null);
    // this.formGroup.get('cidade')?.setValue(null);

  }

  public dispatchPopulateAddress(): void {
    const cep = this.formGroup.get('cep')?.value;
    const onlyNumbers = cep?.replace(/\D/g, '');
    const cepLength = onlyNumbers?.length ?? 0;
    if (cepLength !== 8) {
      this.messageService.showErrorMsg('CEP inválido');
      return;
    }
    this.localService.v1LocalGetEnderecoByCepCepGet(cep)
      .subscribe((endereco) => {
        this.patchEndereco(endereco);
        this.messageService.showSuccessMsg('Endereço preenchido com sucesso!');
      });

  }

  public patchEndereco(endereco: EnderecoDto): void {
    const oldValues = this.formGroup.getRawValue();
    const mergedValues = mergeWithNonEmptyStringOverrides(oldValues, endereco);
    this.formGroup.patchValue(mergedValues, { emitEvent: false });
    this.dispatchEmitEndereco();
  }

  public get cepCidadeUfBuilder(): string {

    if (this.endereco?.cep && this.endereco?.cidade && this.endereco?.uf) {
      return `${this.endereco.cep} - ${this.endereco.cidade.description}/${this.endereco.uf.description}`;
    }

    if (this.endereco?.cep && this.endereco?.cidade) {
      return `${this.endereco.cep} - ${this.endereco.cidade.description}`;
    }

    if (this.endereco?.cep && this.endereco?.uf) {
      return `${this.endereco.cep} - ${this.endereco.uf.description}`;
    }

    if (this.endereco?.cep) {
      return `${this.endereco.cep}`;
    }

    if (this.endereco?.cidade && this.endereco?.uf) {
      return `${this.endereco.cidade.description}/${this.endereco.uf.description}`;
    }

    if (this.endereco?.cidade) {
      return `${this.endereco.cidade.description}`;
    }

    if (this.endereco?.uf) {
      return `${this.endereco.uf.description}`;
    }
    return '';

  }

  public get logradouroBuilder(): string {
    if (this.endereco?.numero && this.endereco?.complemento) {
      return `${this.endereco.logradouro}, ${this.endereco.numero} - ${this.endereco.complemento}`;

    }
    if (this.endereco?.numero) {
      return `${this.endereco.logradouro}, ${this.endereco.numero}`;
    }
    if (this.endereco?.complemento) {
      return `${this.endereco.logradouro}, ${this.endereco.complemento}`;
    }
    return this.endereco?.logradouro ?? '';
  }

}
