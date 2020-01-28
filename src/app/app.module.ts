import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameEngineModule } from '../game-engine/game-engine.module';
import { PixelArrayTestComponent } from './pixel-array-test/pixel-array-test.component';

@NgModule({
  declarations: [
    AppComponent,
    PixelArrayTestComponent
  ],
  imports: [
    BrowserModule,
    GameEngineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
