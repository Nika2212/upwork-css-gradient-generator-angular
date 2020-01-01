import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OutputComponent} from './output.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OutputComponent],
  exports: [OutputComponent]
})

export class OutputModule {}
