import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gtformResizable]'
})
export class GtResizableDirective {
  private startX: number = 0;
  private startWidth: number = 0;
  private resizing: boolean = false;
  private removeMouseMoveListener: (() => void) | null = null;
  private removeMouseUpListener: (() => void) | null = null;

  // Input to enable/disable the resizable feature
  @Input() public isEnabled: boolean = true;

  public constructor(private el: ElementRef, private renderer: Renderer2) {
    // Optionally, apply a mousemove listener to the column header for cursor style
    this.renderer.listen(el.nativeElement, 'mousemove', (event: MouseEvent) => {
      if (this.isEnabled) {
        this.adjustCursor(event);
      }
    });
  }

  public adjustCursor(event: MouseEvent): void {
    if (!this.isEnabled) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const distanceFromRight = rect.right - event.clientX;
    if (distanceFromRight <= 10) { // Adjust as needed
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'col-resize');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'default');
    }
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent): void {
    if (!this.isEnabled) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const distanceFromRight = rect.right - event.pageX;
    if (distanceFromRight > 10) { // Prevent resizing if not near the edge
      return;
    }

    this.resizing = true;
    event.preventDefault();
    this.startX = event.pageX;
    this.startWidth = this.el.nativeElement.offsetWidth;
    this.renderer.addClass(this.el.nativeElement, 'resizing');

    this.removeMouseMoveListener = this.renderer.listen('document', 'mousemove', (event: MouseEvent) => this.onMouseMove(event));
    this.removeMouseUpListener = this.renderer.listen('document', 'mouseup', () => this.onMouseUp());
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.resizing || !this.isEnabled) {
      return;
    }
    const movementX = event.pageX - this.startX;
    const newWidth = this.startWidth + movementX;
    this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
  }

  private onMouseUp(): void {
    if (!this.resizing || !this.isEnabled) {
      return;
    }
    this.resizing = false;
    if (this.removeMouseMoveListener) {
      this.removeMouseMoveListener();
      this.removeMouseMoveListener = null;
    }
    if (this.removeMouseUpListener) {
      this.removeMouseUpListener();
      this.removeMouseUpListener = null;
    }
    this.renderer.removeClass(this.el.nativeElement, 'resizing');
  }
}
