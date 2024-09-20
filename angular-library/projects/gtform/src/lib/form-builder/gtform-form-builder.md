```html

<form class="gtform-container" formGroupName="formGroupInfoProcesso">
  <gtform-accordion header="Informações do processo">
    <div (cdkDropListDropped)="dropInfoProcesso($event)"
         [cdkDropListData]="(infoProcessoFields$ | async)!"
         cdkDropList
         cdkDropListOrientation="mixed"
         class="gtform-row"
    >
      <ng-container *cdkDragPlaceholder></ng-container>
      <div *ngFor="let control of (infoProcessoFields$ | async)!" cdkDrag class="gtform-col-6">
        <app-dynamic-field [control]="control" [formGroup]="formGroup"></app-dynamic-field>
      </div>
    </div>
  </gtform-accordion>
</form>
```
