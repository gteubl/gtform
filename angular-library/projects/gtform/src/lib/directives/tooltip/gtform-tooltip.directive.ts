import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gtformTooltip]'
})
export class GtformTooltipDirective {
  @Input('gtformTooltip') public tooltipTitle: string = '';
  @Input() public toolTipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  public tooltip: HTMLElement | null = null;
  public offset = 10;

  public constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  // Actions
  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  private hide(): void {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }

  private show(): void {
    this.tooltip = this.renderer.createElement('span');
    if (this.tooltip) {
      this.tooltip.innerHTML = this.tooltipTitle;
      this.renderer.appendChild(document.body, this.tooltip);
      this.renderer.addClass(this.tooltip, 'gtform-tooltip');

      const hostPos = this.el.nativeElement.getBoundingClientRect();
      const tooltipPos = this.tooltip.getBoundingClientRect();

      let top: number, left: number;

      switch (this.toolTipPosition) {
      case 'top':
        top = hostPos.top - tooltipPos.height - this.offset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + this.offset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'left':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - this.offset;
        break;
      case 'right':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + this.offset;
        break;
      default:
        top = hostPos.top - tooltipPos.height - this.offset;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      }

      this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
      this.renderer.setStyle(this.tooltip, 'position', 'absolute');
    }
  }
}
