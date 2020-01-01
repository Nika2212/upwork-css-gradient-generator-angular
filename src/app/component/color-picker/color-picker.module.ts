import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerComponent} from './color-picker.component';
import { PropertySelectorComponent } from '../../common/component/property-selector/property-selector.component';
import {FormsModule} from '@angular/forms';
import { ColorPreviewComponent } from './color-preview/color-preview.component';
import {DegreeToPercent} from '../../common/pipe/degree-to-percent.pipe';
import {PercentToDegree} from '../../common/pipe/percent-to-degree.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ColorPickerComponent, PropertySelectorComponent, ColorPreviewComponent, DegreeToPercent, PercentToDegree],
  exports: [ColorPickerComponent, PropertySelectorComponent]
})

export class ColorPickerModule {}
