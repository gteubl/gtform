import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ChoiceOption, LocalService } from 'src/api';
import { FormOption } from 'src/library/utils/form-option';

@Injectable({
  providedIn: 'root'
})
export class EnderecoWrapperRootService {

  private ufOptions = new BehaviorSubject<FormOption[]>([]);
  private ufOptions$ = this.ufOptions.asObservable();

  public constructor(private localService: LocalService) {
  }

  public get getUfOptions(): Observable<FormOption[]> {
    const currentUfOptions = this.ufOptions.getValue();

    if (currentUfOptions.length > 0) {
      return this.ufOptions$;
    }

    if (currentUfOptions.length === 0) {
      this.localService.v1LocalGetAllUfGet().subscribe(
        (ufs) => {
          this.ufOptions.next(
            ufs.map((uf: ChoiceOption) => {
              return {
                description: uf.description,
                value: uf.value
              } as FormOption;
            }
            ));
        }
      );
    }

    return this.ufOptions$;

  }

}
