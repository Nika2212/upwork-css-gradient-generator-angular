import {Component, OnInit} from '@angular/core';
import {Pointer} from './common/model/color-pointer.model';
import {Color} from './common/model/color.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public pointerArray: Pointer[] = [];
  public currentPointer: Pointer;
  public gradientType: string;
  public gradientDirection: number;

  public ngOnInit(): void {
    this.pointerArray.push(this.generateSamplePointer());
    this.currentPointer = this.pointerArray[0];
    this.gradientType = 'linear-gradient';
    this.gradientDirection = 90;
  }
  public generateSamplePointer(): Pointer {
    const color = new Color();
    const pointer = new Pointer();

    color.RGBA = [0, 180, 255, 100];
    color.HSL = [198, 100, 50];
    color.HEX = '00B4FF';

    pointer.pointerColor = color;
    pointer.pointerOffset = 0;
    pointer.pointerOffsetPercentage = 0;

    return pointer;
  }
  public generateSampleColor(): Color {
    const color = new Color();

    color.RGBA = [...this.currentPointer.pointerColor.RGBA];
    color.HSL = [...this.currentPointer.pointerColor.HSL];
    color.HEX = this.currentPointer.pointerColor.HEX;

    return color;
  }
  public onCurrentPointerColorChange(currentPointerColor: Color): void {
    this.currentPointer.pointerColor = currentPointerColor;
  }
  public onCurrentPointerColorReset(): void {
    this.currentPointer = this.generateSamplePointer();
  }
  public onCreatePointer(offset: number): void {
    const newPointer: Pointer = new Pointer();

    newPointer.pointerColor = this.generateSampleColor();
    newPointer.pointerOffset = offset;

    this.pointerArray.push(newPointer);
    this.rearrangePointerArray();
    this.currentPointer = newPointer;
  }
  public onPointerSelect(pointer: Pointer): void {
    this.currentPointer = pointer;
  }
  public onPointerMove(offset: number): void {
    this.currentPointer.pointerOffset += offset;
    this.rearrangePointerArray();
  }
  public rearrangePointerArray(): void {
    this.pointerArray.sort((a: Pointer, b: Pointer) => {
      if (a.pointerOffsetPercentage > b.pointerOffsetPercentage) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  public getGradientPreviewCSSCode(): string[] {
    const firstPointerColor = this.pointerArray[0].pointerColor;

    const background = `rgb(${firstPointerColor.RGBA[0]}, ${firstPointerColor.RGBA[1]}, ${firstPointerColor.RGBA[2]})`;
    let backgroundImage = 'linear-gradient(90deg,';

    this.pointerArray.map((pointer: Pointer, i: number) => {
      backgroundImage += ` rgba(${pointer.pointerColor.RGBA[0]}, ${pointer.pointerColor.RGBA[1]}, ${pointer.pointerColor.RGBA[2]}, ${pointer.pointerColor.RGBA[3]}) ${pointer.pointerOffsetPercentage}%`;
      if (i === this.pointerArray.length - 1) {
        backgroundImage += ')';
      } else {
        backgroundImage += ',';
      }
    });

    return [background, backgroundImage];
  }
  public getGradientFullCSSCode(): string {
    return '';
  }
}
