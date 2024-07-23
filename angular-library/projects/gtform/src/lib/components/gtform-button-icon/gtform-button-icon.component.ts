import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gtform-button-icon',
  templateUrl: './gtform-button-icon.component.html',
  styleUrl: './gtform-button-icon.component.scss'
})
export class GtformButtonIconComponent {

  @Input() public disabled: boolean = false;
  @Input() public icon!: string;
  @Input() public toggle: boolean = false;
  @Output() public btnClick = new EventEmitter<void>();

  public active: boolean = false;

  // Actions
  public onClick(): void {

    if (this.disabled) {
      return;
    }
    this.active = !this.active;
    this.btnClick.emit();

  }
}
