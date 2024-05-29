import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { DialogService } from 'primeng/dynamicdialog';

import { BaseControlValueAccessor } from 'src/library/base-control-value-accessor/base-control-value-accessor';
import { FormChipsModalComponent } from 'src/library/gtform-chips/gtform-chips-modal/gtform-chips-modal.component';
import { ModalDialogSizes } from 'src/library/models/modal-dialog-sizes';
import { FormOption } from 'src/library/utils/form-option';

@Component({
  selector: 'gtform-chips',
  templateUrl: './gtform-chips.component.html',
  styleUrl: './gtform-chips.component.scss'
})
export class GtformChipsComponent extends BaseControlValueAccessor<FormOption[]> implements OnChanges {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public disabled: boolean = false;
  @Input() public invalid: boolean = false;
  @Input() public allOptions: FormOption[] = [];
  @Input() public actionButtonIcon: string | null = null;
  @Input() public showDefaultGrid: boolean = false;
  @Input() public allowFreeText: boolean = false;

  @Output() public actionButtonClicked = new EventEmitter<void>();
  @Output() public valueChangeD = new EventEmitter<FormOption>();
  public chipsValues: FormOption[] = [];
  public isModalOpen = false;
  public inputValue: string = '';

  public constructor(private dialog: DialogService) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes['allOptions'] && changes['allOptions'].currentValue) {
      this.allOptions = changes['allOptions'].currentValue;
    }

    if (changes['showDefaultGrid'] && changes['showDefaultGrid'].currentValue) {
      this.actionButtonIcon = 'search';
    }

    if (changes['innerValue']) {
      this.chipsValues = this.innerValue || [];
    }
  }

  // Actions
  public onClickActionButton(): void {

    if (this.showDefaultGrid) {
      this.dispatchShowDefaultGrid();
      return;
    }

    this.actionButtonClicked.emit();
  }

  public dispatchShowDefaultGrid(): void {
    this.isModalOpen = true;
    const ref = this.dialog.open(FormChipsModalComponent, {
      ...ModalDialogSizes.medium,
      data: {
        options: this.allOptions,
        selectedOptions: this.chipsValues
      },
      header: this.label
    });

    ref.onClose.subscribe((result) => {
      this.isModalOpen = false;

      if (result) {
        this.writeValue(result);
      }
    });

  }

  public addChip(description: string): void {
    if (description && !this.chipsValues.some(chip => chip.description === description)) {
      const newChip: FormOption = {
        value: description,
        description: description
      };
      this.chipsValues.push(newChip);
      this.onChange(this.chipsValues);
    }
    this.inputValue = '';
  }

  public handleKeyDown(event: KeyboardEvent): void {

    if (!this.allowFreeText) {
      event.preventDefault();
      if (this.showDefaultGrid && !this.isModalOpen) {
        this.dispatchShowDefaultGrid();
      }

      return;
    }

    if (event.key === 'Enter') {
      this.addChip((event.target as HTMLInputElement).value);
    }

  }

  public removeChip(index: number): void {
    this.chipsValues.splice(index, 1);
    this.onChange(this.chipsValues);
  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public override writeValue(value: FormOption[]): void {
    this.innerValue = value;
    this.chipsValues = value || [];
  }
}
