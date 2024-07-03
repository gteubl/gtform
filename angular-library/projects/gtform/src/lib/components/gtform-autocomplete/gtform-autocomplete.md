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

<gtform-autocomplete [allOptions]="(options$ | async)!" [showDefaultGrid]="true" formControlName="demo" label="Demo"
></gtform-autocomplete>
```

```typescript
import { blankChoiceOption, FormOption } from 'gtform';

export class DemoComponent {
  options$: Observable<FormOption[]>;

  public formGroup: FormGroup = new FormGroup({
    demo: new FormControl(blankChoiceOption, Validators.required),
  });
}
```
