import { AfterViewInit, Component } from '@angular/core';
import { GameComponent } from '../game-engine/game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends GameComponent implements AfterViewInit {
  width = 500;
  height = 400;

  renderer: CanvasRenderingContext2D;

  pos = {x : 0, y: 0};
  ngAfterViewInit(): void {
    this.onCreate$.subscribe(this.start)
    this.onUpdate$.subscribe(this.update);
    this.construct(this.width, this.height);
  }

  start = () => {
    this.renderer = this.canvas.instance.getContext('2d');
    console.log('setting renderer');
  }

  update = (elapsed) => {
    elapsed = elapsed / 1000;
    this.clear();
    this.renderer.fillStyle = '#ffffff';
    this.renderer.fillText('Elapsed' + elapsed, 10, 10);
    this.renderer.fillRect(this.pos.x, this.pos.y, 100, 100);
    this.pos.x += 90 * elapsed;
    this.pos.y += 90 * elapsed;
    this.pos.x = this.pos.x > this.width ? 0 : this.pos.x;
    this.pos.y = this.pos.y > this.height ? 0 : this.pos.y;
  }

  clear() {
    this.renderer.fillStyle = '#000000';
    this.renderer.fillRect(0, 0, this.width, this.height);
  }
}
