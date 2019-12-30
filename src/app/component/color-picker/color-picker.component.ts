import {Component, Input, OnInit} from '@angular/core';
import {Color} from '../../common/model/color.model';
import {PercentToDegree} from '../../common/pipe/percent-to-degree.pipe';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})

export class ColorPickerComponent implements OnInit {
  @Input() public currentPointerColor: Color;

  public ngOnInit(): void {
    setInterval(() => console.log(this.currentPointerColor.HEX), 1000);
  }
  public onHueChange(value: number): void {
    this.currentPointerColor.HSL[0] = PercentToDegree.Transform(value);
  }
  public onSaturationChange(value: number): void {}
  public onLightnessChange(value: number): void {}
  public onOpacityChange(value: number): void {}
  public onHEXChange(value: string): void {}
  public onReset(): void {}
}
