How to use

```html

<gtform-side-drawer [leftContent]="leftTemplate" [rightContent]="rightTemplate">
  <p>Main content goes here.</p>
  <gtform-button slot="left" (click)="drawer.toggleLeft()">Left</gtform-button>
  <gtform-button slot="right" (click)="drawer.toggleRight()">Right</gtform-button>
</gtform-side-drawer>
<ng-template #leftTemplate>
  <p>Left panel content.</p>
</ng-template>
<ng-template #rightTemplate>
  <p>Right panel content.</p>
</ng-template>

```


