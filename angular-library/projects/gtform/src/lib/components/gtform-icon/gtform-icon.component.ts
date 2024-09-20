import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gtform-icon',
  templateUrl: './gtform-icon.component.html',
  styleUrls: ['./gtform-icon.component.scss'],
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class GtformIconComponent implements OnInit {
  @Input() public additionalClasses: string = '';
  @Input() public color: string = 'var(--main-content-text-color)'; // Default color using CSS variable
  @Input() public disabled: boolean = false;
  @Input() public fontSize: string = '2em'; // Default font size
  @Input() public icon: string = '';
  @HostBinding('style.--icon-color') public iconColor: string = this.color;
  @HostBinding('style.--icon-font-size') public iconFontSize: string = this.fontSize;

  public constructor() {
  }

  public ngOnInit(): void {
    this.iconColor = this.color;
    this.iconFontSize = this.fontSize;
  }
}
