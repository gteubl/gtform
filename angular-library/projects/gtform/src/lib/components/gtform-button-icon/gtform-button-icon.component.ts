import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gtform-button-icon',
  templateUrl: './gtform-button-icon.component.html',
  styleUrl: './gtform-button-icon.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformButtonIconComponent {

  @Input() public disabled: boolean = false;
  @Input() public icon!: string;
  @Input() public toggle: boolean = false;
  @Input() public size: 'small' | 'medium' | 'large' = 'medium';
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

  public get getIconSize(): string {
    switch (this.size) {
    case 'small':
      return '1em';
    case 'medium':
      return '1.2em';
    case 'large':
      return '1.5em';
    }
  }
}
