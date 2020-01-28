import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameContainerDirective } from './game/game-container.directive';
import { CanvasComponent } from './canvas/canvas.component';



@NgModule({
  declarations: [ GameComponent, GameContainerDirective, CanvasComponent ],
  exports: [
    GameContainerDirective
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [ CanvasComponent ]
})
export class GameEngineModule { }
