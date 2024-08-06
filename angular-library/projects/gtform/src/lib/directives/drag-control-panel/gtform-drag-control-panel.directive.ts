import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { GtformDragControlPanelMenuComponent } from './gtform-drag-control-panel-menu/gtform-drag-control-panel-menu.component';

@Directive({
  selector: '[gtformDragControlPanel]'
})
export class GtformDragControlPanelDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public enableMenu: boolean = true;

  private componentRef: ComponentRef<GtformDragControlPanelMenuComponent> | null = null;

  public constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  public ngOnChanges(): void {
    console.log('Enable menu:', this.enableMenu);
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
    console.log('Delete action triggered');
  }

  private onDrag(): void {
    console.log('Drag action triggered');
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
    console.log('Edit action triggered');
  }

  private addMenu(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(GtformDragControlPanelMenuComponent);
    const instance = componentRef.instance;

    instance.dragEvent.subscribe(() => this.onDrag());
    instance.editEvent.subscribe(() => this.onEdit());
    instance.deleteEvent.subscribe(() => this.onDelete());

    // Append the component to the host element
    const hostElement = this.el.nativeElement;
    const menuElement = componentRef.location.nativeElement;
    this.renderer.appendChild(hostElement, menuElement);

    this.componentRef = componentRef;
  }

}
