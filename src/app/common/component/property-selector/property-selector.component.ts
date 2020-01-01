import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'property-selector',
  templateUrl: './property-selector.component.html',
  styleUrls: ['./property-selector.component.css']
})
export class PropertySelectorComponent {
  @Output() public onChangeEvent: EventEmitter<number> = new EventEmitter<number>();
  @Input() public propertyName: string = 'prop';
  @Input() public propertyValue: number = 0;
  @Input() public propertyClassName: string = 'default-gradient';

  public onInputChange(newValue: number, el: HTMLInputElement) {
    newValue = !newValue ? 0 : newValue;

    if (newValue >= 0 && newValue <= 100) {
      this.propertyValue = newValue;
    }
    el.value = this.propertyValue.toString(10);

    this.onChange();
  }
  public onChange(): void {
    this.onChangeEvent.emit(this.propertyValue);
  }
}
