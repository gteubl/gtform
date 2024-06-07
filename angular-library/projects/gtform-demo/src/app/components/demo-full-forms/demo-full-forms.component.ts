import { Component } from '@angular/core';

import { TabLabel } from 'gtform';

@Component({
  selector: 'app-demo-full-forms',
  templateUrl: './demo-full-forms.component.html',
  styleUrl: './demo-full-forms.component.scss'
})
export class DemoFullFormsComponent {
  public tabs: TabLabel[] = [
    {
      label: 'Tab 1',
      contentKey: 'tab1'
    },
    {
      label: 'Tab 2',
      contentKey: 'tab2'
    },
    {
      label: 'Tab 3',
      contentKey: 'tab3'
    },
    {
      label: 'Tab 4',
      contentKey: 'tab4'
    }

  ];

  public activeTab: TabLabel = this.tabs[0];

  // Actions
  public onActiveTabChanged(activeTab: TabLabel): void {
    this.activeTab = activeTab;
  }
}
