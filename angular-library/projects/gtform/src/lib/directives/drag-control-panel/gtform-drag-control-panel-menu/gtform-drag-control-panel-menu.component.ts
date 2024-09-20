import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gtform-drag-control-panel-menu',
  templateUrl: './gtform-drag-control-panel-menu.component.html',
  styleUrl: './gtform-drag-control-panel-menu.component.scss'
})
export class GtformDragControlPanelMenuComponent {
  @Output() public dragEvent = new EventEmitter<void>();
  @Output() public editEvent = new EventEmitter<void>();
  @Output() public deleteEvent = new EventEmitter<void>();

  // Actions
  public onDelete(): void {
    this.deleteEvent.emit();
  }

  public onDrag(): void {
    this.dragEvent.emit();
  }

  public onEdit(): void {
    this.editEvent.emit();
  }
}
