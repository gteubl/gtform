Como utilizar:

```html

<div class="form-container">
  <div class="form-row">
    <div class="form-group col-12" >
      <form-grid [dataSource]="(gridDataSource$ | async)!"
                 [gridColumns]="defaultGridColumns"
                 [gridRowActions]="gridRowActions"
                 [remoteDataSource]="true"
                 [headerConfig]="headerConfig"
                 (gridDataRequestChanged)="dispatchGetAllLocal($event)"
                 (rowClicked)="rowClicked($event)"
                 [showFooter]="true"
                 [gridHeight]="(body.offsetHeight - header.offsetHeight).toString() + 'px'"
      ></form-grid>
    </div>
  </div>
</div>

<ng-template #andamento let-row>
  {{ row.andamento }}
</ng-template>
```

```typescript
 public headerConfig: GridHeaderConfig = {
  showFilter: true,
  actionsButtons: [
    {
      icon: 'add',
      action: () => this.dispatchAddNewLocal(),
      tooltip: 'Adicionar local'
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

@ViewChild('andamento') public andamento!: TemplateRef<any>;
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
    text: 'Abrir local'
  },
  {
    icon: 'edit',
    action: (row) => this.dispatchEditLocal(row),
    text: 'Editar local'
  },
];


```
