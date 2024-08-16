import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TabLabel {
  id: string;
  label: string;
  icon?: string;
  canClose?: boolean;
}

@Component({
  selector: 'gtform-tabs',
  templateUrl: './gtform-tabs.component.html',
  styleUrl: './gtform-tabs.component.scss'
})
export class GtformTabsComponent implements OnInit {
  @Input() public tabs: TabLabel[] = [];
  @Input() public tabLevel: 1 | 2 = 1;
  @Output() public activeTabChanged = new EventEmitter<TabLabel>();

  public isTabActive = (tab: TabLabel): boolean => {
    return this.activeTab === tab;
  };
  private activeTab: TabLabel = this.tabs[0];

  public ngOnInit(): void {

    if (this.tabs.length > 0) {
      this.selectActiveTab(this.tabs[0]);
    }
  }

  public addTab(tab: TabLabel): void {
    this.tabs.push(tab);
    if (this.tabs.length === 1) {
      this.selectActiveTab(tab);
    }
  }

  public closeTab(tab: TabLabel, event: MouseEvent): void {
    event.stopPropagation();
    this.removeTabById(tab.id);
  }

  public removeTabById(id: string): void {
    const index = this.tabs.findIndex(tab => tab.id === id);
    if (index > -1) {
      const tab = this.tabs[index];
      if (tab.canClose !== true) {
        return;
      }
      this.tabs.splice(index, 1);
      if (this.activeTab === tab && this.tabs.length > 0) {
        this.selectActiveTab(this.tabs[0]);
      } else if (this.tabs.length === 0) {
        this.tabs.push({
          id: 'default-tab',
          label: 'Tab'
        });
        this.activeTab = this.tabs[0];
        this.activeTabChanged.emit(this.activeTab);
      }
    }
  }

  public selectActiveTab(tab: TabLabel): void {
    this.activeTab = tab;
    this.activeTabChanged.emit(this.activeTab);
  }
}
