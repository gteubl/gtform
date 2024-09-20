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
      id: 'tab1'
    },
    {
      label: 'Tab 2',
      id: 'tab2',
      canClose: true
    },
    {
      label: 'Tab 3',
      id: 'tab3',
      canClose: true
    },
    {
      label: 'Tab 4',
      id: 'tab4'

    }

  ];

  public activeTab: TabLabel = this.tabs[0];

  // Actions
  public onActiveTabChanged(activeTab: TabLabel): void {
    this.activeTab = activeTab;
  }
}
