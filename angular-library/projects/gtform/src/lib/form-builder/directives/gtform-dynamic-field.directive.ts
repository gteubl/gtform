import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gtformDynamicField]'
})
export class GtformDynamicFieldDirective {

  public constructor(public viewContainerRef: ViewContainerRef) {
  }

}
