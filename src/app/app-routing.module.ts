import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapEditorComponent } from './app/map-editor/map-editor.component';
import { GameDemoComponent } from './app/game-demo/game-demo.component';
import { AuctionViewComponent } from './app/auction-view/auction-view.component';
import { HomeComponent } from './app/home/home.component';
import { GuardingService } from './app/guarding.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [GuardingService]
  },
  {
    path: 'demo',
    component: GameDemoComponent,
    canActivate: [GuardingService]
  },
  {
    path: 'edit',
    component: MapEditorComponent,
    canActivate: [GuardingService]
  },
  {
    path: 'auction',
    component: AuctionViewComponent,
    canActivate: [GuardingService]
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
