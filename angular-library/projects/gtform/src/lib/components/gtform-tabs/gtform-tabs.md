Como utilizar:
```html
<form class="form-container">
  <form-tabs (activeTabChanged)="onActiveTabChanged($event)" [tabs]="tabs">
    <app-processo-detalhe-processo [hidden]="activeTab.contentKey !== 'processo'"></app-processo-detalhe-processo>
    <app-processo-detalhe-argumentos [hidden]="activeTab.contentKey !== 'argumentos'"></app-processo-detalhe-argumentos>
    <app-processo-detalhe-audiencia [hidden]="activeTab.contentKey !== 'audiencias'"></app-processo-detalhe-audiencia>
    <app-processo-detalhe-diligencia [hidden]="activeTab.contentKey !== 'diligencias'"></app-processo-detalhe-diligencia>
    <app-processo-detalhe-decisoes [hidden]="activeTab.contentKey !== 'decisoes'"></app-processo-detalhe-decisoes>
    <app-processo-detalhe-execucao [hidden]="activeTab.contentKey !== 'execucoes-cumprimentos'"></app-processo-detalhe-execucao>
    <app-processo-detalhe-andamento [hidden]="activeTab.contentKey !== 'andamentos'"></app-processo-detalhe-andamento>
    <app-processo-detalhe-arquivos [hidden]="activeTab.contentKey !== 'arquivos'"></app-processo-detalhe-arquivos>
    <app-processo-detalhe-custo-processo [hidden]="activeTab.contentKey !== 'custo-processo'"></app-processo-detalhe-custo-processo>
  </form-tabs>
</form>
```

```typescript

  public onActiveTabChanged(activeTab: TabLabel): void {
    this.activeTab = activeTab;
  }

  public tabs: TabLabel[] = [
    {
      label: 'Processo',
      contentKey: 'processo'
    }]

  public activeTab: TabLabel = this.tabs[0];

```
