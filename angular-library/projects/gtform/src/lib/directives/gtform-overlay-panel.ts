import { Directive, ElementRef, Input, Renderer2, HostListener, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gtformOverlayPanel]'
})
export class GtformOverlayPanelDirective {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input('gtformOverlayPanel') public panelTemplate!: TemplateRef<any>;
  @Input() public position: 'top' | 'bottom' | 'left' | 'right' = 'right';

  private panel: HTMLElement | null = null;
  private offset = 10;

  public constructor(private el: ElementRef, private renderer: Renderer2, private viewContainerRef: ViewContainerRef) {}

  @HostListener('click')
  public onClick(): void {
    if (this.panel) {
      this.hide();
    } else {
      this.show();
    }
  }

  private hide(): void {
    if (this.panel) {
      this.renderer.removeChild(document.body, this.panel);
      this.panel = null;
      this.viewContainerRef.clear();
    }
  }

  private show(): void {
    this.panel = this.renderer.createElement('div');
    if (this.panel) {
      const embeddedView = this.viewContainerRef.createEmbeddedView(this.panelTemplate);
      embeddedView.detectChanges();
      const nodes = embeddedView.rootNodes;
      nodes.forEach(node => this.renderer.appendChild(this.panel, node));

      this.renderer.appendChild(document.body, this.panel);
      this.renderer.addClass(this.panel, 'overlay-panel');

      const hostPos = this.el.nativeElement.getBoundingClientRect();
      const panelPos = this.panel.getBoundingClientRect();

      let top: number, left: number;

      switch (this.position) {
      case 'top':
        top = hostPos.top - panelPos.height - this.offset;
        left = hostPos.left + (hostPos.width - panelPos.width) / 2;
        break;
      case 'bottom':
        top = hostPos.bottom + this.offset;
        left = hostPos.left + (hostPos.width - panelPos.width) / 2;
        break;
      case 'left':
        top = hostPos.top + (hostPos.height - panelPos.height) / 2;
        left = hostPos.left - panelPos.width - this.offset;
        break;
      case 'right':
        top = hostPos.top + (hostPos.height - panelPos.height) / 2;
        left = hostPos.right + this.offset;
        break;
      default:
        top = hostPos.top - panelPos.height - this.offset;
        left = hostPos.left + (hostPos.width - panelPos.width) / 2;
        break;
      }

      this.renderer.setStyle(this.panel, 'top', `${top}px`);
      this.renderer.setStyle(this.panel, 'left', `${left}px`);
      this.renderer.setStyle(this.panel, 'position', 'absolute');
    }
  }
}
