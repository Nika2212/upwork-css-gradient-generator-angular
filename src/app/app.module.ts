import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ColorPickerModule} from './component/color-picker/color-picker.module';
import {GradientControlModule} from './component/gradient-control/gradient-control.module';
import {FullGradientModule} from './component/full-gradient/full-gradient.module';
import {OutputModule} from './component/output/output.module';
import {LocationSelectorModule} from './component/location-selector/location-selector.module';
import { GradientPatternsModule } from './component/gradient-patterns/gradient-patterns.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    GradientControlModule,
    FullGradientModule,
    OutputModule,
    LocationSelectorModule,
    GradientPatternsModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
