import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'code-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent {
  @Input() public CSSCode: string[];
  @ViewChild('cssOutputRef', {static: false}) public cssOutputRef: ElementRef;
  @ViewChild('sassOutputRef', {static: false}) public sassOutputRef: ElementRef;
  public currentTabName: string = 'CSS';

  public changeCurrentTab(): void {
    if (this.currentTabName === 'CSS') {
      this.currentTabName = 'SASS';
    } else if (this.currentTabName === 'SASS') {
      this.currentTabName = 'CSS';
    }
  }
  public copyToClipboard(): void {
    let str: string = '';

    if (this.currentTabName === 'CSS') {
      str = this.cssOutputRef.nativeElement.innerText;
    } else {
      str = this.sassOutputRef.nativeElement.innerText;
    }

    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
