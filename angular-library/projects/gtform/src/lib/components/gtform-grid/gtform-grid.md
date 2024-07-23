Como utilizar:

```html

<div class="form-container">
  <div class="form-row">
    <div class="form-group col-12">
      <gtform-grid [dataSource]="(gridDataSource$ | async)!"
                   [gridColumns]="defaultGridColumns"
                   [gridRowActions]="gridRowActions"
                   [gridRowStyles]="gridRowsStyles"
                   [remoteDataSource]="true"
                   [headerConfig]="headerConfig"
                   (gridDataRequestChanged)="dispatchGetAllLocal($event)"
                   (rowClicked)="rowClicked($event)"
                   [showFooter]="true"
                   [gridHeight]="(body.offsetHeight - header.offsetHeight).toString() + 'px'"
      ></gtform-grid>
    </div>
  </div>
</div>
<ng-template #andamento let-row>
  {{ row.andamento }}
</ng-template>
```

```typescript
export class GridComponent {
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
        action: () => alert('Delete button clicked'),
        tooltip: 'Delete button',
        toggle: true
      }
    ]
  };
  protected readonly GridDataSource = GridDataSource;
  private gridDataSource = new BehaviorSubject(new GridDataSource<ClienteResponseDto>([], 0));
  public gridDataSource$ = this.gridDataSource.asObservable();
  private defaultRequestFilter: GridDataSourceRequest = {
    skip: 0,
    take: 100

  };

  @ViewChild('andamento')
  public andamento!: TemplateRef<any>;

  public get gridColumns(): GridColumn[] {
    return [
      {
        propertyName: 'tipo',
        headerText: 'Tipo',
        dataType: GridDataType.STRING,
        width: GridColumnSizeConstants.MEDIUM
      },
      {
        propertyName: 'data',
        headerText: 'Data',
        dataType: GridDataType.DATETIME,
        width: GridColumnSizeConstants.MEDIUM
      },
      {
        propertyName: 'usuario',
        headerText: 'Usuário',
        dataType: GridDataType.STRING,
        width: GridColumnSizeConstants.MEDIUM
      },
      {
        propertyName: 'andamento',
        headerText: 'Andamento',
        dataType: GridDataType.CUSTOMTEMPLATE,
        template: this.andamento,
      }
    ];
  }

  public gridRowActions: GridRowActions[] = [
    {
      icon: 'open_in_new',
      action: (row) => this.dispatchOpenLocal(row),
      text: 'Abrir local',
      show: (row) => row.rawData.id != 1
    },
    {
      icon: 'edit',
      action: (row) => this.dispatchEditLocal(row),
      text: 'Editar local',
      disabled: (row) => row.rawData.column2,
    },
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

  public ngOnInit(): void {
    this.dispatchGetAllLocal(this.defaultRequestFilter);
  }

  public dispatchGetTenants(request: TenantGridFilter): void {
    this.tenantService.v1TenantGetTenantsGet(request)
      .subscribe(response => {
        this.gridDataSource.next(response as GridDataSource<TenantGridResponse>);
      });
  }

}


```
