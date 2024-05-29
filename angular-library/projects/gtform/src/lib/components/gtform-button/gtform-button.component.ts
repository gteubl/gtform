import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtform-button',
  template: `
          <div class="button-container">
              <button [disabled]="disabled" [ngClass]="{'icon-button': hasIcon, 'disabled' : disabled}" class="{{color}}">
                  <ng-content></ng-content>
              </button>
          </div>
  `,
  styleUrl: './gtform-button.component.scss'
})
export class GtformButtonComponent {
  @Input() public color : 'primary' | 'secondary' | 'default' = 'default';
  @Input() public disabled = false;

  public text = '';
  public hasIcon = false;


}

