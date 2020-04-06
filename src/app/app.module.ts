import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BreadcrumbModule, ButtonModule, InputModule, TagModule, TilesModule } from 'carbon-components-angular';

import { AppComponent } from './app.component';
import { GameEngineModule } from '../game-engine/game-engine.module';
import { MapEditorComponent } from './app/map-editor/map-editor.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { IntroComponent } from './app/intro/intro.component';
import { GameDemoComponent } from './app/game-demo/game-demo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuctionListComponent } from './app/auction-list/auction-list.component';
import { AuctionTileComponent } from './app/auction-tile/auction-tile.component';
import { AuctionViewComponent } from './app/auction-view/auction-view.component';
import { HomeComponent } from './app/home/home.component';
import { FormsModule } from '@angular/forms';
import { UserInputeComponent } from './app/user-inpute/user-inpute.component';

@NgModule({
  declarations: [
    AppComponent,
    MapEditorComponent,
    IntroComponent,
    GameDemoComponent,
    AuctionListComponent,
    AuctionTileComponent,
    AuctionViewComponent,
    HomeComponent,
    UserInputeComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    GameEngineModule,
    ButtonModule,
    TilesModule,
    RouterModule,
    BreadcrumbModule,
    AppRoutingModule,
    InputModule,
    TagModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
