import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'gradient-patterns',
  templateUrl: './gradient-patterns.component.html',
  styleUrls: ['./gradient-patterns.component.css']
})
export class GradientPatternsComponent {
  @Input() public rawGradientArray: any[];
  @Output() public onGradientSelectEvent: EventEmitter<number> = new EventEmitter<number>();

  public getGradientCSSCode(gradient: any): string {
    let background: string = 'linear-gradient(90deg, ';

    gradient.pointers.map((pointer: any, i: number) => {
      const RGB = pointer.RGB;
      const position = pointer.position;

      background += `rgba(${RGB[0]}, ${RGB[1]}, ${RGB[2]}, 100) ${position}%`;

      if (i !== gradient.pointers.length - 1) {
        background += ', ';
      } else {
        background += ')';
      }
    });

    return background;
  }
  public onGradientSelect(index: number): void {
    this.onGradientSelectEvent.emit(index);
  }
}
