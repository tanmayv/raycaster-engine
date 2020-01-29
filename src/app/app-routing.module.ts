import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapEditorComponent } from './app/map-editor/map-editor.component';
import { GameDemoComponent } from './app/game-demo/game-demo.component';
import { IntroComponent } from './app/intro/intro.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  {
    path: 'demo',
    component: GameDemoComponent
  },
  {
    path: 'edit',
    component: MapEditorComponent
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
