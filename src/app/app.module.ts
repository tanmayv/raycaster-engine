import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BreadcrumbModule, ButtonModule, TilesModule } from 'carbon-components-angular';

import { AppComponent } from './app.component';
import { GameEngineModule } from '../game-engine/game-engine.module';
import { MapEditorComponent } from './app/map-editor/map-editor.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { IntroComponent } from './app/intro/intro.component';
import { GameDemoComponent } from './app/game-demo/game-demo.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    MapEditorComponent,
    IntroComponent,
    GameDemoComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    GameEngineModule,
    ButtonModule,
    TilesModule,
    RouterModule,
    BreadcrumbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
