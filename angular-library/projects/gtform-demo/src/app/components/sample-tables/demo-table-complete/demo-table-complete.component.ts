import { Component, OnInit } from '@angular/core';

import { ChoiceOption, GridColumn, GridDataSource, GridDataType, GridHeaderConfig, GridRow, GridRowActions, GridRowStyles } from 'gtform';

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
  public gridColumns: GridColumn[] = [
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
      text: 'Edit',
      show: (row) => row.rawData.id != 1
    },
    {
      icon: 'delete',
      action: (row) => this.dispatchDelete(row),
      text: 'Delete'
    },
    {
      icon: 'add',
      action: (row) => this.dispatchAdd(row),
      disabled: (row) => row.rawData.column2,

      text: 'Add'
    }
  ];

  public gridRowsStyles: GridRowStyles[] = [
    {
      color: (row) => row.rawData.column2 ? 'white' : null,
      backgroundColor: (row) => row.rawData.column2 ? 'red' : null
    },
    {
      fontWeight: (row) => row.rawData.id == 1 ? 'bold' : null,
      fontStyle: (row) => row.rawData.id == 3 ? 'italic' : null
    }
  ];

  public headerConfig: GridHeaderConfig = {
    showFilter: true,
    actionsButtons: [
      {
        icon: 'add',
        action: () => alert('Add new row'),
        tooltip: 'Add new row'
      },
      {
        icon: 'delete',
        action: () => console.warn('Delete button clicked'),
        tooltip: 'Delete button',
        toggle: true
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

    },
    {
      id: 4,
      column1: 'Column 4',
      column2: false,
      colum4: { value: 4, description: 'Choice 4' }
    },
    {
      id: 5,
      column1: 'Column 5',
      column2: false,
      colum4: { value: 5, description: 'Choice 5' }
    },
    {
      id: 6,
      column1: 'Column 6',
      column2: false,
      colum4: { value: 6, description: 'Choice 6' }
    },
    {
      id: 7,
      column1: 'Column 7',
      column2: false,
      colum4: { value: 7, description: 'Choice 7' }
    },
    {
      id: 8,
      column1: 'Column 8',
      column2: false,
      colum4: { value: 8, description: 'Choice 8' }
    },
    {
      id: 9,
      column1: 'Column 9',
      column2: false,
      colum4: { value: 9, description: 'Choice 9' }
    },
    {
      id: 10,
      column1: 'Column 10',
      column2: false,
      colum4: { value: 10, description: 'Choice 10' }
    }

  ];

  public ngOnInit(): void {
    this.gridDataSource = new GridDataSource<DemoData>(this.mockData, this.mockData.length);
  }

  private dispatchAdd(row: GridRow): void {
    alert(`Add row ${row.rawData.id}`);
  }

  private dispatchDelete(row: GridRow): void {
    alert(`Edit row ${row.rawData.id}`);
  }

  private dispatchEdit(row: GridRow): void {
    alert(`Delete row ${row.rawData.id}`);
  }
}
