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

  public ngOnInit(): void {
    this.pointerArray.push(this.generateSamplePointer());
    this.currentPointer = this.pointerArray[0];
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
}
