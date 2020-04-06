import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapEditorComponent } from './app/map-editor/map-editor.component';
import { GameDemoComponent } from './app/game-demo/game-demo.component';
import { AuctionListComponent } from './app/auction-list/auction-list.component';
import { AuctionViewComponent } from './app/auction-view/auction-view.component';
import { HomeComponent } from './app/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'demo',
    component: GameDemoComponent
  },
  {
    path: 'edit',
    component: MapEditorComponent
  },
  {
    path: 'auction',
    component: AuctionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
