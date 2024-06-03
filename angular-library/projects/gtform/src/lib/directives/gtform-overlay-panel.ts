import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOverlayPanel]'
})
export class OverlayPanelDirective {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input('appOverlayPanel') public templateRef!: TemplateRef<any>;
  @Input() public position: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private overlay: HTMLElement | null = null;

  public constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('click')
  public toggle(): void {
    console.log('toggle')
    if (this.overlay) {
      this.hide();
    } else {
      this.show();
    }
  }

  private show(): void {
    this.overlay = this.renderer.createElement('div');
    this.renderer.addClass(this.overlay, 'custom-overlay-panel');

    const embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef);
    embeddedView.rootNodes.forEach(node => this.renderer.appendChild(this.overlay, node));

    this.renderer.appendChild(document.body, this.overlay);
    this.setPosition();
  }

  private hide() : void {
    if (this.overlay) {
      this.renderer.removeChild(document.body, this.overlay);
      this.overlay = null;
    }
  }

  private setPosition(): void {
    if (!this.overlay) {
      return;
    }
    const hostElem = this.elementRef.nativeElement;
    const hostPos = hostElem.getBoundingClientRect();
    const overlayPos = this.overlay.getBoundingClientRect();

    let top, left;

    switch (this.position) {
    case 'top':
      top = hostPos.top - overlayPos.height;
      left = hostPos.left + (hostPos.width - overlayPos.width) / 2;
      break;
    case 'bottom':
      top = hostPos.bottom;
      left = hostPos.left + (hostPos.width - overlayPos.width) / 2;
      break;
    case 'left':
      top = hostPos.top + (hostPos.height - overlayPos.height) / 2;
      left = hostPos.left - overlayPos.width;
      break;
    case 'right':
      top = hostPos.top + (hostPos.height - overlayPos.height) / 2;
      left = hostPos.right;
      break;
    }

    this.renderer.setStyle(this.overlay, 'top', `${top}px`);
    this.renderer.setStyle(this.overlay, 'left', `${left}px`);
  }
}
