import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TabLabel } from 'gtform';

import { ChoiceOption } from '../../../../../../gtform/src/lib/models/index';

@Component({
  selector: 'app-demo-full-form-tab1',
  templateUrl: './demo-full-form-tab1.component.html',
  styleUrl: './demo-full-form-tab1.component.scss'
})
export class DemoFullFormTab1Component implements OnInit {

  // @ViewChild('drawerContent') public drawerContent!: GtformSideDrawerComponent;

  public tabs: TabLabel[] = [
    {
      label: 'Sub Tab 1',
      id: 'sub-tab1'
    },
    {
      label: 'Sub Tab 2',
      id: 'sub-tab2'
    },
    {
      label: 'Sub Tab 3',
      id: 'sub-tab3'
    }
  ];
  public activeTab: TabLabel = this.tabs[0];
  public selectOptions1: ChoiceOption[] = [
    { value: '-1', description: '' },
    { value: '1', description: 'Option 1' },
    { value: '2', description: 'Option 2' },
    { value: '3', description: 'Option 3' },
    { value: '4', description: 'Option 4' },
    { value: '5', description: 'Option 5' }];

  public chips1Options: ChoiceOption[] = [
    { value: '1', description: 'Option 1' },
    { value: '2', description: 'Option 2' },
    { value: '3', description: 'Option 3' },
    { value: '4', description: 'Option 4' },
    { value: '5', description: 'Option 5' }
  ];
  //FormGroups
  public formGroup = new FormGroup({
    ctrl1: new FormControl(null, Validators.required),
    ctrl2: new FormControl(null, Validators.required),
    ctrl3: new FormControl(null, Validators.required),
    ctrl4: new FormControl(null, Validators.required),
    ctrl5: new FormControl(null, Validators.required),
    ctrl6: new FormControl(null, Validators.required),
    ctrl7: new FormControl(null, Validators.required),
    ctrl8: new FormControl(null, Validators.required),
    ctrl9: new FormControl(null, Validators.required),
    ctrl10: new FormControl(null, Validators.required),
    checkBox1: new FormControl(true, Validators.required),
    checkSwitch1: new FormControl(true, Validators.required),
    ctrl12: new FormControl(null, Validators.required),
    chips1: new FormControl(null, Validators.required),
    chips2: new FormControl(null, Validators.required),

    selectOption1: new FormControl(this.selectOptions1[2], Validators.required)

  });

  public ngOnInit(): void {
    this.formGroup.controls.selectOption1.valueChanges.subscribe((value) => {
      console.log('selectOption1 value changed', value);
    });

    this.formGroup.controls.chips1.valueChanges.subscribe((value) => {
      console.log('chips1 value changed', value);
    });

    this.formGroup.controls.chips2.valueChanges.subscribe((value) => {
      console.log('chips2 value changed', value);
    });
  }

  // Actions
  public onActiveTabChanged(activeTab: TabLabel): void {
    this.activeTab = activeTab;
  }
}
