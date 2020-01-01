import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationSelectorComponent} from './location-selector.component';
import {ColorPickerModule} from '../color-picker/color-picker.module';

@NgModule({
  imports: [CommonModule, ColorPickerModule],
  declarations: [LocationSelectorComponent],
  exports: [LocationSelectorComponent]
})

export class LocationSelectorModule {}
