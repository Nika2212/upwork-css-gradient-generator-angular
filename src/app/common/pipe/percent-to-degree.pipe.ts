import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'percentToDegree'})

export class PercentToDegree implements PipeTransform {
  static Transform(value: number): number {
    return Math.round((value * 360) / 100);
  }

  transform(value: number): number {
    return Math.round((value * 360) / 100);
  }
}
