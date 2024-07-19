/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'gtform-side-drawer',
  templateUrl: './gtform-side-drawer.component.html',
  styleUrl: './gtform-side-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GtformSideDrawerComponent {
  @Input() public leftContent: TemplateRef<any> | null = null;
  @Input() public rightContent: TemplateRef<any> | null = null;

  @Input() public panelWidth: string = '250px';
  @Input() public backgroundColor: string = 'var(--primary-color)';
  @Input() public color: string = 'var(--text-color-secondary)';
  public isLeftOpen = false;
  public isRightOpen = false;

  public constructor(private cdr: ChangeDetectorRef) {
  }

  public toggleLeft(): void {
    this.isLeftOpen = !this.isLeftOpen;
    this.cdr.detectChanges();
  }

  public toggleRight(): void {
    this.isRightOpen = !this.isRightOpen;
    this.cdr.detectChanges();
  }
}
