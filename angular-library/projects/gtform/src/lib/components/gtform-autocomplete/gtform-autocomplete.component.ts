import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

import { ChoiceOption } from '../../models';
import { includesAccentInsensitive, startsWithAccentInsensitive } from '../../utils';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { GtformDynamicModalService, ModalSizes } from '../gtform-dynamic-modal/index';

import { GtformAutocompleteModalComponent } from './gtform-autocomplete-modal/gtform-autocomplete-modal.component';

@Component({
  selector: 'gtform-autocomplete',
  templateUrl: './gtform-autocomplete.component.html',
  styleUrls: ['./gtform-autocomplete.component.scss'],
  host: { 'hostID': crypto.randomUUID().toString() },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GtformAutocompleteComponent),
      multi: true
    }
  ]
})
export class GtformAutocompleteComponent extends BaseControlValueAccessor<ChoiceOption | null> implements OnChanges {
  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public disabled: boolean = false;
  @Input() public invalid: boolean = false;
  @Input() public choiceOptions: ChoiceOption[] = [];
  @Input() public actionButtonIcon: string | null = null;
  @Input() public showDefaultGrid: boolean = false;

  @Output() public actionButtonClicked = new EventEmitter<void>();
  @Output() public inputTextChange = new EventEmitter<string>();

  @ViewChild(NgModel) public model!: NgModel;

  public searchTerm: string = '';
  public searchResults: ChoiceOption[] = [];
  public suggestion: string = '';

  public constructor(private modalService: GtformDynamicModalService) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes['allOptions'] && changes['allOptions'].currentValue) {
      this.setAutoSearchValid();
    }

    if (changes['showDefaultGrid'] && changes['showDefaultGrid'].currentValue) {
      this.actionButtonIcon = 'search';
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

  public onClickClearButton(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.suggestion = '';
    this.setAutoSearchValid();
    this.writeValue({ value: '', description: '' });
  }

  public dispatchShowDefaultGrid(): void {
    const ref = this.modalService.open(GtformAutocompleteModalComponent, {
      ...ModalSizes.small,
      data: {
        options: this.choiceOptions
      },
      title: this.label

    });

    ref.closed.subscribe((result) => {
      if (result) {
        this.writeValue(result);
        this.updateSuggestion();

        this.setAutoSearchValid();
      }
    });

  }

  public handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    switch (key) {
    case 'ArrowDown':
      event.preventDefault();
      if (this.searchResults.length > 0) {
        this.selectedIndex = (this.selectedIndex + 1) % this.searchResults.length;
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (this.searchResults.length > 0) {
        this.selectedIndex = ((this.selectedIndex - 1) + this.searchResults.length) % this.searchResults.length;
      }
      break;
    case 'Enter':
      event.preventDefault();
      if (this.selectedIndex >= 0) {
        this.selectItem(this.searchResults[this.selectedIndex]);
      } else if (this.suggestion) {
        const item = this.searchResults.find(e => e.description === this.suggestion);
        if (item) {
          this.selectItem(item);
        }
      }
      break;

    case 'Escape':
      break;
    }
  }

  public search(): void {

    if (!this.searchTerm) {
      this.searchResults = [];
      this.selectedIndex = -1;
      this.suggestion = '';
      this.model.control.setErrors(null);
      return;
    }

    this.inputTextChange.emit(this.searchTerm);

    this.searchResults = this.choiceOptions.filter(option =>
      includesAccentInsensitive(option.description, this.searchTerm))
      .slice(0, 5);

    this.updateSuggestion();

    this.setAutoSearchValid();

  }

  public override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public override writeValue(value: ChoiceOption): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.searchTerm = value?.description || '';
    }
  }

  private setAutoSearchValid(): void {
    const isValid = this.choiceOptions.some(option => option.description === this.searchTerm);
    this.onChange(isValid ? this.choiceOptions.find(option => option.description === this.searchTerm)! : null);
    this.model?.control?.setErrors(isValid ? null : { 'notInList': true });
  }

  private updateSuggestion(): void {
    const matchingOption = this.choiceOptions.find(option =>
      startsWithAccentInsensitive(option.description, this.searchTerm));
    this.suggestion = matchingOption ? matchingOption.description : '';
  }

  // Selectors
  public selectedIndex: number = -1;

  public selectItem(item: ChoiceOption): void {
    this.searchTerm = item.description;
    this.searchResults = [];
    this.selectedIndex = -1;
    this.updateSuggestion();
    this.setAutoSearchValid();
  }
}
