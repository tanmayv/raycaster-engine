import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { GameContainerDirective } from './game-container.directive';
import { CanvasComponent } from '../canvas/canvas.component';
import { Subject } from 'rxjs';
import { GameLoop } from './game-loop';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  width;
  height;

  canvas;
  gameLoop: GameLoop;
  onCreate$ = new Subject();
  onUpdate$ = new Subject();

  @ViewChild(GameContainerDirective)
  gameContainer;

  constructor(private injector: Injector, private resolver: ComponentFactoryResolver) { }

  public construct(width, height, fps = 30) {
   this.width = width;
   this.height = height;

   if (this.gameContainer) {
     const factory = this.resolver.resolveComponentFactory(CanvasComponent);
     this.canvas = factory.create(this.injector);
     this.canvas.instance.width = width;
     this.canvas.instance.height = height;
     this.gameContainer.ref.insert(this.canvas.hostView);
     this.gameLoop = new GameLoop();
     this.onCreate$.next();
     this.gameLoop.start((elapsedTime) => {
       this.onUpdate$.next(elapsedTime);
     }, fps);
   } else {
     alert('Err: Cannot create cavas, game container missing!');
   }
  }

  ngOnInit() {
  }

}
