/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

import { GridDataType } from '../models';

@Pipe({
  name: 'castData'
})
export class CastDataPipe implements PipeTransform {

  public transform(value: any, dataType: GridDataType): any {
    switch (dataType) {
    case GridDataType.DATE:
    case GridDataType.DATETIME:
      return new Date(value);
    case GridDataType.CURRENCY:
    case GridDataType.PERCENTAGE:
      return Number(value);
    default:
      return value;
    }

  }
}
