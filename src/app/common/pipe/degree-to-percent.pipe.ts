import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'degreeToPercent'})

export class DegreeToPercent implements PipeTransform {
  static Transform(value: number): number {
    return Math.round((value * 100) / 360);
  }

  transform(value: number): number {
    return Math.round((value * 100) / 360);
  }
}
