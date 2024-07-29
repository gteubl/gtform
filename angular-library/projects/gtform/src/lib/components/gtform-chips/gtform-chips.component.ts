import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ChoiceOption } from '../../models';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { GtformDynamicModalService, ModalSizes } from '../gtform-dynamic-modal/index';

import { GtformChipsModalComponent } from './gtform-chips-modal/gtform-chips-modal.component';

@Component({
  selector: 'gtform-chips',
  templateUrl: './gtform-chips.component.html',
  styleUrl: './gtform-chips.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformChipsComponent),
      multi: true
    }]
})
export class GtformChipsComponent extends BaseControlValueAccessor<ChoiceOption[]> implements OnChanges {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public disabled: boolean = false;
  @Input() public invalid: boolean = false;
  @Input() public allOptions: ChoiceOption[] = [];
  @Input() public actionButtonIcon: string | null = null;
  @Input() public showDefaultGrid: boolean = false;
  @Input() public allowFreeText: boolean = false;

  @Output() public actionButtonClicked = new EventEmitter<void>();
  @Output() public valueChangeD = new EventEmitter<ChoiceOption>();
  public chipsValues: ChoiceOption[] = [];
  public isModalOpen = false;
  public inputValue: string = '';

  public constructor(private modalService: GtformDynamicModalService) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes['allOptions'] && changes['allOptions'].currentValue) {
      this.allOptions = changes['allOptions'].currentValue;
    }

    if (changes['showDefaultGrid'] && changes['showDefaultGrid'].currentValue) {
      this.actionButtonIcon = 'search';
    }

    if (changes['innerValue']) {
      this.chipsValues = this.innerValue || [];
    }
  }

  // Actions
  public onClickActionButton(): void {

    if (this.showDefaultGrid) {
      this.dispatchShowDefaultGrid();
      return;
    }

    this.actionButtonClicked.emit();
  }

  public dispatchShowDefaultGrid(): void {
    this.isModalOpen = true;
    const ref = this.modalService.open(GtformChipsModalComponent, {
      ...ModalSizes.medium,
      data: {
        options: this.allOptions,
        selectedOptions: this.chipsValues
      },
      title: this.label
    });

    ref.closed.subscribe((result) => {
      this.isModalOpen = false;

      if (result) {
        this.writeValue(result);
      }
    });

  }

  public addChip(description: string): void {
    if (description && !this.chipsValues.some(chip => chip.description === description)) {
      const newChip: ChoiceOption = {
        value: description,
        description: description
      };
      this.chipsValues.push(newChip);
      this.onChange(this.chipsValues);
    }
    this.inputValue = '';
  }

  public handleKeyDown(event: KeyboardEvent): void {

    if (!this.allowFreeText) {
      event.preventDefault();
      if (this.showDefaultGrid && !this.isModalOpen) {
        this.dispatchShowDefaultGrid();
      }

      return;
    }

    if (event.key === 'Enter') {
      this.addChip((event.target as HTMLInputElement).value);
    }

  }

  public removeChip(index: number): void {
    const allChips = this.value;
    const value = allChips.filter((chip, i) => i !== index);

    this.chipsValues = value;
    this.value = value;
  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public override writeValue(value: ChoiceOption[]): void {
    this.chipsValues = value || [];
    this.value = value;
  }
}
