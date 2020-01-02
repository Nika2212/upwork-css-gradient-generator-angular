import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerModule} from '../color-picker/color-picker.module';
import {GradientPatternsComponent} from './gradient-patterns.component';

@NgModule({
  imports: [CommonModule, ColorPickerModule],
  declarations: [GradientPatternsComponent],
  exports: [GradientPatternsComponent]
})

export class GradientPatternsModule {}
