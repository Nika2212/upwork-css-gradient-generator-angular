import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'full-gradient',
  templateUrl: './full-gradient.component.html',
  styleUrls: ['./full-gradient.component.css']
})
export class FullGradientComponent implements OnInit {
  @Input() public gradientCSSCode: string;
  @Input() public gradientDirection: number;
  @Input() public gradientType: string;
  @Input() public gradientFlip: boolean;
  @Output() public onGradientDirectionChangeEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onGradientTypeChangeEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() public onGradientFlipEvent: EventEmitter<null> = new EventEmitter<null>();
  public gradientDirectionArray: number[] = [];

  public ngOnInit(): void {
    this.gradientDirectionArray = [90, 180, 45, 135];
  }
  public onDirectionChange(direction: number): void {
    this.onGradientDirectionChangeEvent.emit(direction);
  }
  public onGradientTypeChange(): void {
    this.onGradientTypeChangeEvent.emit(null);
  }
  public onGradientFlip(): void {
    this.onGradientFlipEvent.emit(null);
  }
}
