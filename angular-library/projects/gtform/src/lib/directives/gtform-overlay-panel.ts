import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[gtformOverlayPanel]'
})
export class OverlayPanelDirective implements AfterViewInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input('gtformOverlayPanel') public templateRef!: TemplateRef<any>;
  @Input() public overlayPanelPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private overlay: HTMLElement | null = null;
  private resizeListener!: () => void;

  public constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  public ngAfterViewInit(): void {
    this.setHostRelativePosition();
    this.resizeListener = this.renderer.listen('window', 'resize', () => this.onResize());
  }

  public ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  // Actions
  private onResize(): void {
    if (this.overlay) {
      this.setPosition();
    }
  }

  @HostListener('click')
  public toggle(): void {
    if (this.overlay) {
      this.hide();
    } else {
      this.show();
    }
  }

  private hide(): void {
    if (this.overlay) {
      this.renderer.removeChild(document.body, this.overlay);
      this.overlay = null;
    }
  }

  private setHostRelativePosition(): void {
    const hostElem = this.elementRef.nativeElement;
    const position = getComputedStyle(hostElem).position;
    if (position === 'static' || !position) {
      this.renderer.setStyle(hostElem, 'position', 'relative');
    }
  }

  private setPosition(): void {
    if (!this.overlay) return;

    const hostElem = this.elementRef.nativeElement;
    const hostPos = hostElem.getBoundingClientRect();
    const overlayPos = this.overlay.getBoundingClientRect();

    let top, left;

    switch (this.overlayPanelPosition) {
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

    // Adjust position to make sure the overlay is fully visible within the viewport
    //  const viewportWidth = window.innerWidth;
    // const viewportHeight = window.innerHeight;

    if (top < 0) top = 0;
    if (left < 0) left = 0;

    //TODO: Uncomment the following lines to prevent the overlay from going out of the viewport
    //  if (top + overlayPos.height > viewportHeight) top = viewportHeight - overlayPos.height;
    //    if (left + overlayPos.width > viewportWidth) left = viewportWidth - overlayPos.width;

    this.renderer.setStyle(this.overlay, 'top', `${top}px`);
    this.renderer.setStyle(this.overlay, 'left', `${left}px`);
  }

  private show(): void {
    this.overlay = this.renderer.createElement('div');
    this.renderer.addClass(this.overlay, 'custom-overlay-panel');

    const embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef);
    embeddedView.rootNodes.forEach(node => this.renderer.appendChild(this.overlay, node));

    this.renderer.appendChild(document.body, this.overlay);

    // Ensure overlay is rendered to calculate its dimensions
    setTimeout(() => {
      this.setPosition();
    });
  }
}
