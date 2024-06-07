import { Component } from '@angular/core';

import { TabLabel } from 'gtform';

@Component({
  selector: 'app-demo-full-form-tab1',
  templateUrl: './demo-full-form-tab1.component.html',
  styleUrl: './demo-full-form-tab1.component.scss'
})
export class DemoFullFormTab1Component {

  public tabs: TabLabel[] = [
    {
      label: 'Sub Tab 1',
      contentKey: 'sub-tab1'
    },
    {
      label: 'Sub Tab 2',
      contentKey: 'sub-tab2'
    },
    {
      label: 'Sub Tab 3',
      contentKey: 'sub-tab3'
    }
  ];

  public activeTab: TabLabel = this.tabs[0];

  // Actions

  public onActiveTabChanged(activeTab: TabLabel): void {
    this.activeTab = activeTab;
  }
}
