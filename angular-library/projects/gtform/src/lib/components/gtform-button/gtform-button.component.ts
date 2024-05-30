import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtform-button',
  templateUrl: './gtform-button.component.html',
  styleUrl: './gtform-button.component.scss'
})
export class GtformButtonComponent {
  @Input() public color : 'primary' | 'secondary' | 'default' = 'default';
  @Input() public disabled = false;

  public text = '';
  public hasIcon = false;


}

