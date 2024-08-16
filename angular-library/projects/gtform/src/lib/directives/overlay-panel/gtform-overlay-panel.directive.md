Passing directive as param of a function in Angular

#actionsOverlay="gtformOverlayPanel"

(click)="onActionClick(action, actionsOverlay)"

```HTML

<gtform-button-icon #actionsOverlay="gtformOverlayPanel" [gtformOverlayPanel]="opRowAction" [overlayPanelPosition]="'left'" icon="more_vert"
></gtform-button-icon>
<ng-template #opRowAction>
  <div (click)="onActionClick(action, actionsOverlay)"
       *ngFor="let action of gridRowActions"
       class="action-item {{ action.disabled ? 'disabled' : '' }}"
  >
    <gtform-icon [disabled]="action.disabled ?? false" [icon]="action.icon" fontSize="1rem"></gtform-icon>
    <span>{{ action.text }}</span>
  </div>
</ng-template>
```

```typescript
export class GtformOverlayPanelDirective {
  public onActionClick(action: GridRowActions, actionsOverlay: OverlayPanelDirective): void {
    actionsOverlay.hide();
    action.action(this.currentRow!);
  }
}
```



