import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GradientControlComponent} from './gradient-control.component';
import {GradientPointerModule} from './gradient-pointer/gradient-pointer.module';

@NgModule({
  imports: [CommonModule, GradientPointerModule],
  declarations: [GradientControlComponent],
  exports: [GradientControlComponent]
})

export class GradientControlModule {}
