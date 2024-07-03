How to use:

```html

<div class="form-container">
  <gtform-tabs (activeTabChanged)="onActiveTabChanged($event)" [tabs]="tabs">
    <app-component1 [hidden]="activeTab.contentKey !== 'component1'"></app-component1>
    <app-component2 [hidden]="activeTab.contentKey !== 'component2'"></app-component2>
  </gtform-tabs>
</div>

```

```typescript
export class DemoComponent {
  public tabs: TabLabel[] = [
    {
      label: 'Component1',
      contentKey: 'component1'
    },
    {
      label: 'Component2',
      contentKey: 'component2'
    }
  ];

  public activeTab: TabLabel = this.tabs[0];

  public onActiveTabChanged(activeTab: TabLabel): void {
    this.activeTab = activeTab;
  }
}
```

Demo example:

```html

<div class="gtform-container">
  <gtform-tabs (activeTabChanged)="onActiveTabChanged($event)" [tabLevel]="2" [tabs]="tabs">
    <ng-container [ngSwitch]="activeTab">
      <div *ngSwitchCase="tabs[0]">
        tab 1
      </div>
      <div *ngSwitchCase="tabs[1]">
        tab 2
      </div>
      <div *ngSwitchCase="tabs[2]">
        tab 3
      </div>
    </ng-container>
  </gtform-tabs>
</div>
````
