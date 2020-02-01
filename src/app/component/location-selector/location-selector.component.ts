import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})
export class LocationSelectorComponent {
  @Input() public pointerLocation: number;
  @Output() public onPointerLocationChangeEvent: EventEmitter<number> = new EventEmitter<number>();

  public onLocationChange(value: number): void {
    this.onPointerLocationChangeEvent.emit(value);
  }
}
