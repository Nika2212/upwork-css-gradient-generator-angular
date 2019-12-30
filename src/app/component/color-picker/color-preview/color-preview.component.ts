import {Component, Input} from '@angular/core';

@Component({
  selector: 'color-preview',
  templateUrl: './color-preview.component.html',
  styleUrls: ['./color-preview.component.css']
})

export class ColorPreviewComponent {
  @Input() public RGBA: number[] = [];
  @Input() public HEX: string;
}
