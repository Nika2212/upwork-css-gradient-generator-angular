import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'color-preview',
  templateUrl: './color-preview.component.html',
  styleUrls: ['./color-preview.component.css']
})

export class ColorPreviewComponent {
  @Output() public onRGBAChangeEvent: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() public onHEXChangeEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onResetEvent: EventEmitter<null> = new EventEmitter<null>();
  @Input() public RGBA: number[] = [];
  @Input() public HEX: string;

  public onRGBAChange(index: number, newValue: number, el: HTMLInputElement): void {
    newValue = !newValue ? 0 : newValue;

    if (index !== 3 && newValue >= 0 && newValue <= 255) {
      this.RGBA[index] = newValue;
    } else if (index === 3 && newValue >= 0 && newValue <= 100) {
      this.RGBA[index] = newValue;
    }

    el.value = this.RGBA[index].toString(10);

    this.onRGBAChangeEvent.emit(this.RGBA);
  }
  public onHEXChange(newValue: string, el: HTMLInputElement): void {
    newValue = !newValue ? '' : newValue;
    newValue = newValue.toUpperCase();
    const HEXRegExp: RegExp = new RegExp(/^[0-9a-f]+$/i);

    if (HEXRegExp.test(newValue) && newValue.length <= 6 || newValue === '') {
      this.HEX = newValue;
    }

    el.value = this.HEX;

    if (this.HEX.length === 6 && HEXRegExp.test(this.HEX)) {
      this.onHEXChangeEvent.emit(this.HEX);
    }
  }
  public onReset(): void {
    this.onResetEvent.emit(null);
  }
  public getRGBACSSCode(): string {
    return `rgba(${this.RGBA[0]}, ${this.RGBA[1]}, ${this.RGBA[2]}, ${this.RGBA[3] / 100})`;
  }
}
