import {Component, OnInit} from '@angular/core';
import {Pointer} from './common/model/color-pointer.model';
import {Color} from './common/model/color.model';
import {zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public isMobileDevice: boolean;
  public pointerArray: Pointer[] = [];
  public currentPointer: Pointer;
  public gradientType: string;
  public gradientDirection: number;
  public gradientFlip: boolean;
  public gradientPointersFieldWidth: number;
  public gradientPreviewCSSCode: string;
  public gradientFullCSSCode: string;

  public ngOnInit(): void {
    this.isMobileDevice = window.screen.width <= 768;

    this.pointerArray.push(this.generateSamplePointer());
    this.currentPointer = this.pointerArray[0];
    this.gradientType = 'linear-gradient';
    this.gradientDirection = 90;
    this.gradientFlip = false;

    this.renderGradient();
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

    color.RGBA[3] = 100;

    return color;
  }
  public onCurrentPointerColorChange(currentPointerColor: Color): void {
    this.currentPointer.pointerColor = currentPointerColor;
    this.renderGradient();
  }
  public onCurrentPointerColorReset(): void {
    const color = new Color();

    color.RGBA = [0, 180, 255, 100];
    color.HSL = [198, 100, 50];
    color.HEX = '00B4FF';

    this.currentPointer.pointerColor = color;

    this.renderGradient();
  }
  public onCreatePointer(offset: number): void {
    const newPointer: Pointer = new Pointer();

    newPointer.pointerColor = this.generateSampleColor();
    newPointer.pointerOffset = offset;
    newPointer.pointerOffsetPercentage = (offset * 100) / this.gradientPointersFieldWidth;

    this.pointerArray.push(newPointer);
    this.rearrangePointerArray();
    this.currentPointer = newPointer;

    this.renderGradient();
  }
  public onPointerSelect(pointer: Pointer): void {
    this.currentPointer = pointer;
  }
  public onPointerMove(offset: number): void {
    this.currentPointer.pointerOffset += offset;
    this.currentPointer.pointerOffsetPercentage = (this.currentPointer.pointerOffset * 100) / this.gradientPointersFieldWidth;
    this.rearrangePointerArray();
    this.renderGradient();
  }
  public onCurrentPointerLocationChange(value: number): void {
    this.currentPointer.pointerOffsetPercentage = Math.round(value);
    this.currentPointer.pointerOffset = (value * this.gradientPointersFieldWidth) / 100;

    this.rearrangePointerArray();

    this.renderGradient();
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
  public getGradientPreviewCSSCode(): string {
    const firstPointerColor = this.pointerArray[0].pointerColor;
    let backgroundImage = 'linear-gradient(90deg,';

    if (this.pointerArray.length === 1) {
      backgroundImage = `linear-gradient(90deg, rgba(${firstPointerColor.RGBA[0]}, ${firstPointerColor.RGBA[1]}, ${firstPointerColor.RGBA[2]}, 1) 0%, rgba(${firstPointerColor.RGBA[0]}, ${firstPointerColor.RGBA[1]}, ${firstPointerColor.RGBA[2]}, 1) 100%)`;

      return backgroundImage;
    }

    this.pointerArray.map((pointer: Pointer, i: number) => {
      backgroundImage += ` rgba(${pointer.pointerColor.RGBA[0]}, ${pointer.pointerColor.RGBA[1]}, ${pointer.pointerColor.RGBA[2]}, ${pointer.pointerColor.RGBA[3] / 100}) ${pointer.pointerOffsetPercentage}%`;
      if (i === this.pointerArray.length - 1) {
        backgroundImage += ')';
      } else {
        backgroundImage += ',';
      }
    });

    return backgroundImage;
  }
  public getGradientFullCSSCode(): string {
    if (this.pointerArray.length === 1) {
      return this.gradientPreviewCSSCode;
    }

    let backgroundImage: string = '';

    if (this.gradientType === 'linear-gradient') {
      backgroundImage += `linear-gradient(${this.gradientDirection}deg, `;
    } else if (this.gradientType === 'radial-gradient') {
      backgroundImage += `radial-gradient(circle, `;
    }

    this.pointerArray.map((pointer: Pointer, index: number) => {
      const RGBA = pointer.pointerColor.RGBA;
      const position = pointer.pointerOffsetPercentage;

      backgroundImage += `rgba(${RGBA[0]}, ${RGBA[1]}, ${RGBA[2]}, ${RGBA[3] / 100}) ${position}%`;

      if (index !== this.pointerArray.length - 1) {
        backgroundImage += ', ';
      } else {
        backgroundImage += ')';
      }
    });

    return backgroundImage;
  }
  public getGradientPointersFieldWidth(width: number): void {
    this.gradientPointersFieldWidth = width;
  }
  public renderGradient(): void {
    this.gradientPreviewCSSCode = this.getGradientPreviewCSSCode();
    this.gradientFullCSSCode = this.getGradientFullCSSCode();
  }
  public onGradientDirectionChange(direction: number): void {
    this.gradientDirection = direction;
    this.renderGradient();
  }
  public onGradientRadialStateChange(): void {
    if (this.gradientType === 'linear-gradient') {
      this.gradientType = 'radial-gradient';
    } else if (this.gradientType === 'radial-gradient') {
      this.gradientType = 'linear-gradient';
    }

    this.renderGradient();
  }
  public onGradientFlip(): void {
    this.gradientFlip = !this.gradientFlip;

    this.renderGradient();
  }
}
