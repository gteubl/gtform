import { Component, OnInit } from '@angular/core';

import { ChoiceOption, GridColumns, GridDataSource, GridDataType, GridHeaderConfig, GridRow, GridRowActions } from 'gtform';

export interface DemoData {
  id: number,
  column1: string,
  column2: boolean,
  colum4: ChoiceOption

}

@Component({
  selector: 'app-demo-table-complete',
  templateUrl: './demo-table-complete.component.html',
  styleUrl: './demo-table-complete.component.scss'
})
export class DemoTableCompleteComponent implements OnInit {
  public gridDataSource: GridDataSource<DemoData> | undefined;
  public gridColumns: GridColumns[] = [
    {
      propertyName: 'column1',
      headerText: 'Column 1',
      dataType: GridDataType.STRING
    },
    {
      propertyName: 'column2',
      headerText: 'Column 2',
      dataType: GridDataType.BOOLEAN
    },
    {
      propertyName: 'colum4',
      headerText: 'Column 4',
      dataType: GridDataType.CHOICEOPTION
    }
  ];
  public gridRowActions: GridRowActions[] = [
    {
      icon: 'edit',
      action: (row) => this.dispatchEdit(row),
      text: 'Edit'
    },
    {
      icon: 'delete',
      action: (row) => this.dispatchDelete(row),
      text: 'Delete'
    }
  ];
  public headerConfig: GridHeaderConfig = {
    showFilter: true,
    actionsButtons: [
      {
        icon: 'add',
        action: () => alert('Add new row'),
        tooltip: 'Add new row'
      }
    ]
  };

  private mockData: DemoData[] = [
    {
      id: 1,
      column1: 'Column 1',
      column2: false,
      colum4: { value: 1, description: 'Choice 1' }
    },
    {
      id: 2,
      column1: 'Column 2',
      column2: true,
      colum4: { value: 2, description: 'Choice 2' }
    },
    {
      id: 3,
      column1: 'Column 3',
      column2: false,
      colum4: { value: 3, description: 'Choice 3' }

    }

  ];

  public ngOnInit(): void {
    this.gridDataSource = new GridDataSource<DemoData>(this.mockData, this.mockData.length);
  }

  private dispatchDelete(row: GridRow): void {
    alert(`Edit row ${row.rawData.id}`);
  }

  private dispatchEdit(row: GridRow): void {
    alert(`Delete row ${row.rawData.id}`);
  }
}
