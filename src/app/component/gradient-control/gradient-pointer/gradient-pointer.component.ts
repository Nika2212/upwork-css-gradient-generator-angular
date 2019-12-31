import { Component, Input } from '@angular/core';

@Component({
  selector: 'gradient-pointer',
  templateUrl: './gradient-pointer.component.html',
  styleUrls: ['./gradient-pointer.component.css']
})
export class GradientPointerComponent {
  @Input() public isActive: boolean = false;
  @Input() public RGBA: number[] = [0, 0, 0, 100];

  public getRGBACSSCode(): string {
    return `rgba(${this.RGBA[0]}, ${this.RGBA[1]}, ${this.RGBA[2]}, ${this.RGBA[3] / 100})`;
  }
}
