import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {Color} from '../../common/model/color.model';
import {PercentToDegree} from '../../common/pipe/percent-to-degree.pipe';
import { Pointer } from '../../common/model/color-pointer.model';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})

export class ColorPickerComponent implements OnInit {
  @Input() public currentPointerColor: Color;
  @Output() public onCurrentPointerColorChangeEvent: EventEmitter<Color> = new EventEmitter<Color>();
  @Output() public onCurrentPointerColorResetEvent: EventEmitter<null> = new EventEmitter<null>();

  public ngOnInit(): void {
  }
  public onHueChange(value: number): void {
    this.currentPointerColor.HSL[0] = PercentToDegree.Transform(value);
    this.updateCurrentPointerColor('HSL');
  }
  public onSaturationChange(value: number): void {
    this.currentPointerColor.HSL[1] = value;
    this.updateCurrentPointerColor('HSL');
  }
  public onLightnessChange(value: number): void {
    this.currentPointerColor.HSL[2] = value;
    this.updateCurrentPointerColor('HSL');
  }
  public onOpacityChange(value: number): void {
    this.currentPointerColor.RGBA[3] = value;
    this.updateCurrentPointerColor('RGBA');
  }
  public onRGBAChange(): void {
    this.updateCurrentPointerColor('RGBA');
  }
  public onHEXChange(value: string): void {
    this.currentPointerColor.HEX = value;
    this.updateCurrentPointerColor('HEX');
  }
  public onReset(): void {
    this.onCurrentPointerColorResetEvent.emit(null);
  }

  public updateCurrentPointerColor(moduleName: string): void {
    if (moduleName === 'HSL') {
      this.currentPointerColor.HEX = Color.HSLToHEX(this.currentPointerColor.HSL);
      this.currentPointerColor.RGBA = [...Color.HSLToRGB(this.currentPointerColor.HSL), this.currentPointerColor.RGBA[3]];
    } else if (moduleName === 'RGBA') {
      this.currentPointerColor.HSL = Color.RGBToHSL(this.currentPointerColor.RGBA);
      this.currentPointerColor.HEX = Color.RGBToHEX(this.currentPointerColor.RGBA);
    } else if (moduleName === 'HEX') {
      this.currentPointerColor.RGBA = [...Color.HEXToRGB(this.currentPointerColor.HEX), this.currentPointerColor.RGBA[3]];
      this.currentPointerColor.HSL = Color.HEXToHSL(this.currentPointerColor.HEX);
    }

    this.onCurrentPointerColorChangeEvent.emit(this.currentPointerColor);
  }
}
