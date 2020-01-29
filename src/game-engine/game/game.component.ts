import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { GameContainerDirective } from './game-container.directive';
import { CanvasComponent } from '../canvas/canvas.component';
import { Subject } from 'rxjs';
import { GameLoop } from './game-loop';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  width;
  height;

  canvas;
  renderer;

  gameLoop: GameLoop;
  onCreate$ = new Subject();
  onUpdate$ = new Subject();

  @ViewChild(GameContainerDirective)
  gameContainer;

  constructor(public resolver: ComponentFactoryResolver) { }

  public construct(width, height, fps = 30) {
   this.width = width;
   this.height = height;

   if (this.gameContainer) {
     const factory = this.resolver.resolveComponentFactory(CanvasComponent);
     this.canvas = factory.create(this.gameContainer.viewContainerRef);
     this.canvas.instance.width = width;
     this.canvas.instance.height = height;
     this.gameContainer.ref.insert(this.canvas.hostView);
     this.renderer = this.canvas.instance.getContext('2d');
     this.gameLoop = new GameLoop();
     setTimeout(() => {
       this.onCreate$.next();
       this.gameLoop.start((elapsedTime) => {
         this.onUpdate$.next(elapsedTime);
       }, fps);
     }, 1);
   } else {
     alert('Err: Cannot create cavas, game container missing!');
   }
  }

  ngOnInit() {
  }

}
