import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface TabLabel {
  label: string;
  icon?: string;
  contentKey: string;
}

@Component({
  selector: 'gtform-tabs',
  templateUrl: './gtform-tabs.component.html',
  styleUrl: './gtform-tabs.component.scss'
})
export class GtformTabsComponent implements OnInit {
  @Input() public tabs: TabLabel[] = [];
  @Input() public tabLevel : 1 | 2  = 1;
  @Output() public activeTabChanged = new EventEmitter<TabLabel>();
  public isTabActive = (tab: TabLabel): boolean => {
    return this.activeTab === tab;
  };
  private activeTab: TabLabel = this.tabs[0];

  public ngOnInit(): void {
    this.selectActiveTab(this.tabs[0]);
  }

  public selectActiveTab(tab: TabLabel): void {
    this.activeTab = tab;
    this.activeTabChanged.emit(this.activeTab);
  }
}
