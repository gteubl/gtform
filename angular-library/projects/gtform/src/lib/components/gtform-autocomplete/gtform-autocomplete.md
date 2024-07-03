```angular17html

<gtform-autocomplete [allOptions]="[{
                           value: '1',
                           description: 'Option 1'
                           }, {
                             value: '2',
                           description: 'Option 2'
                           }]" label="AutoComplete"
></gtform-autocomplete>
```

```angular17html

<gtform-autocomplete [allOptions]="(options$ | async)!" [showDefaultGrid]="true" formControlName="uf" label="Estado"
></gtform-autocomplete>
```

```typescript

export class DemoComponent {
  options$: Observable<FormOption[]>;
}
```
