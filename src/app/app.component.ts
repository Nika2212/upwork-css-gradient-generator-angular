import {Component, OnInit} from '@angular/core';
import {Pointer} from './common/model/color-pointer.model';
import {Color} from './common/model/color.model';
import {TemplatePointer} from './common/model/template-pointer.model';

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
  public rawGradientArray: any[];


  public ngOnInit(): void {
    this.isMobileDevice = window.screen.width <= 768;

    this.pointerArray.push(this.generateSamplePointer());
    this.currentPointer = this.pointerArray[0];
    this.gradientType = 'linear-gradient';
    this.gradientDirection = 90;
    this.gradientFlip = false;

    this.renderGradient();

    this.generateRawGradientArray();
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

  public rearrangePointerArray(): void {
    this.pointerArray.sort((a: Pointer, b: Pointer) => {
      if (a.pointerOffsetPercentage > b.pointerOffsetPercentage) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  public renderGradient(): void {
    this.gradientPreviewCSSCode = this.getGradientPreviewCSSCode();
    this.gradientFullCSSCode = this.getGradientFullCSSCode();
    this.getOutputCode();
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
      let flippedDirection = this.gradientDirection;

      if (this.gradientFlip) {
        flippedDirection += 180;
        flippedDirection = flippedDirection >= 360 ? flippedDirection - 360 : flippedDirection;
        backgroundImage += `linear-gradient(${flippedDirection}deg, `;
      } else {
        backgroundImage += `linear-gradient(${this.gradientDirection}deg, `;
      }

    } else if (this.gradientType === 'radial-gradient') {
      backgroundImage += `radial-gradient(circle, `;
    }

    this.pointerArray.map((pointer: Pointer, index: number) => {
      const RGBA = pointer.pointerColor.RGBA;
      const position = Math.round(pointer.pointerOffsetPercentage);

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

  public getOutputCode(): void {
    // let background: string = '';
    // let backgroundImage: string = '';

    // const firstColorRGBA = this.pointerArray[0].pointerColor.RGBA;

    // background = `rgb(${firstColorRGBA[0]}, ${firstColorRGBA[1]}, ${firstColorRGBA[2]}, ${firstColorRGBA[3]})`;
    // backgroundImage = this.getGradientFullCSSCode();
  }

  public createTemplatePointer(templatePointer: TemplatePointer): void {
    const newPointer: Pointer = new Pointer();
    const newColor: Color = new Color();

    newColor.RGBA = [...templatePointer.RGBA];
    newColor.HSL = Color.RGBToHSL(newColor.RGBA);
    newColor.HEX = Color.RGBToHEX(newColor.RGBA);

    newPointer.pointerColor = newColor;
    newPointer.pointerOffset = (templatePointer.position * this.gradientPointersFieldWidth) / 100;
    newPointer.pointerOffsetPercentage = templatePointer.position;

    this.pointerArray.push(newPointer);
    this.rearrangePointerArray();
    this.currentPointer = newPointer;

    this.renderGradient();
  }

  public parseRawGradientArray(index: number): void {
    this.pointerArray = [];

    const gradient = this.rawGradientArray[index];
    for (const pointer of gradient.pointers) {
      const templatePointer = new TemplatePointer();

      templatePointer.RGBA = [...pointer.RGB, 100];
      templatePointer.position = pointer.position;

      this.createTemplatePointer(templatePointer);
    }

    console.log(this.pointerArray);
  }

  private generateRawGradientArray(): void {
    this.rawGradientArray = [
      {
        pointers: [
          {
            RGB: [248, 80, 50],
            position: 0
          },
          {
            RGB: [241, 111, 92],
            position: 50
          },
          {
            RGB: [246, 41, 12],
            position: 51
          },
          {
            RGB: [240, 47, 23],
            position: 71
          },
          {
            RGB: [231, 56, 39],
            position: 100
          }
        ]
      }
    ];
  }
}
