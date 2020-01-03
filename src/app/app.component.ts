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
  public outputCode: string[] = [];


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

  public onPointerRemove(index: number): void {
    this.pointerArray.splice(index, 1);
    this.onPointerSelect(this.pointerArray[this.pointerArray.length - 1]);
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
    this.outputCode = this.getOutputCode();
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

  public getOutputCode(): string[] {
    let background: string = '';
    let backgroundImage: string = '';

    const firstColorRGBA = this.pointerArray[0].pointerColor.RGBA;

    background = `rgb(${firstColorRGBA[0]}, ${firstColorRGBA[1]}, ${firstColorRGBA[2]}, ${firstColorRGBA[3]})`;
    backgroundImage = this.getGradientFullCSSCode();

    return [background, backgroundImage];
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
      },

      {
        pointers: [
          {
            RGB: [255, 93, 177],
            position: 0
          },
          {
            RGB: [239, 1, 124],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [252, 234, 187],
            position: 0
          },
          {
            RGB: [252, 205, 77],
            position: 50
          },
          {
            RGB: [248, 181, 0],
            position: 51
          },
          {
            RGB: [251, 223, 147],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [239, 197, 202],
            position: 0
          },
          {
            RGB: [210, 75, 90],
            position: 50
          },
          {
            RGB: [186, 39, 55],
            position: 51
          },
          {
            RGB: [241, 142, 153],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [0, 255, 255],
            position: 47
          },
          {
            RGB: [16, 0, 255],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [34, 193, 195],
            position: 0
          },
          {
            RGB: [253, 187, 45],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [83, 53, 31],
            position: 0
          },
          {
            RGB: [49, 72, 196],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [131, 58, 180],
            position: 0
          },
          {
            RGB: [253, 29, 29],
            position: 50
          },
          {
            RGB: [252, 176, 69],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [238, 174, 202],
            position: 0
          },
          {
            RGB: [148, 187, 233],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [5, 5, 5],
            position: 0
          },
          {
            RGB: [0, 180, 255],
            position: 50
          },
          {
            RGB: [5, 5, 5],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [167, 207, 223],
            position: 0
          },
          {
            RGB: [35, 83, 138],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [222, 239, 255],
            position: 0
          },
          {
            RGB: [152, 190, 222],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [255, 255, 255],
            position: 0
          },
          {
            RGB: [241, 241, 241],
            position: 50
          },
          {
            RGB: [225, 225, 225],
            position: 51
          },
          {
            RGB: [246, 246, 246],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [169, 3, 41],
            position: 0
          },
          {
            RGB: [143, 2, 34],
            position: 44
          },
          {
            RGB: [109, 0, 25],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [183, 222, 237],
            position: 0
          },
          {
            RGB: [113, 206, 239],
            position: 50
          },
          {
            RGB: [33, 180, 226],
            position: 51
          },
          {
            RGB: [183, 222, 237],
            position: 100
          },
        ]
      },

      {
        pointers: [
          {
            RGB: [73, 155, 234],
            position: 0
          },
          {
            RGB: [32, 124, 229],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [255, 0, 132],
            position: 0
          },
          {
            RGB: [255, 0, 132],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [210, 255, 82],
            position: 0
          },
          {
            RGB: [145, 232, 66],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [210, 255, 82],
            position: 0
          },
          {
            RGB: [145, 232, 66],
            position: 100
          }
        ]
      },

      {
        pointers: [
          {
            RGB: [255, 175, 75],
            position: 0
          },
          {
            RGB: [255, 146, 10],
            position: 100
          }
        ]
      },


    ];
  }
}
