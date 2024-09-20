import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import {
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { GtformDragControlPanelMenuComponent } from './gtform-drag-control-panel-menu/gtform-drag-control-panel-menu.component';

@Directive({
  selector: '[gtformDragControlPanel]'
})
export class GtformDragControlPanelDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public enableMenu: boolean = true;
  @Output() public editEvent = new EventEmitter<void>();
  @Output() public deleteEvent = new EventEmitter<void>();

  private componentRef: ComponentRef<GtformDragControlPanelMenuComponent> | null = null;

  public constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  public ngOnChanges(): void {
    if (this.enableMenu) {
      this.addMenu();
    } else {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
    }
  }

  public ngOnInit(): void {
    if (this.enableMenu) {
      this.addMenu();
    }
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  // Actions
  private onDelete(): void {
    this.deleteEvent.emit();
  }

  @HostListener('cdkDragEnded', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onDragEnd(event: CdkDragEnd): void {
    if (this.enableMenu) {
      this.addMenu();
    }
  }

  @HostListener('cdkDragStarted', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onDragStart(event: CdkDragStart): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private onEdit(): void {
    this.editEvent.emit();
  }

  private addMenu(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(GtformDragControlPanelMenuComponent);
    const instance = componentRef.instance;

    instance.editEvent.subscribe(() => this.onEdit());
    instance.deleteEvent.subscribe(() => this.onDelete());

    // Append the component to the host element
    const hostElement = this.el.nativeElement;
    const menuElement = componentRef.location.nativeElement;
    this.renderer.appendChild(hostElement, menuElement);

    this.componentRef = componentRef;
  }

}
