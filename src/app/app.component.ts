import { AfterViewInit, Component } from '@angular/core';
import { GameComponent } from '../game-engine/game/game.component';
import { getRandomString } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent extends GameComponent implements AfterViewInit {
  tileSize = 20;
  nTiles = 50;
  mapSize = 16;

  width = this.tileSize * this.nTiles;
  height = this.tileSize * this.nTiles;

  renderer: CanvasRenderingContext2D;

  pos = { x: 8, y: 8 };
  pAngle = 0;
  fov = Math.PI / 4;

  velocity = { x: 0, y: 0 };
  step = 40;
  friction = 0.9;
  maxValue = 100;

  counter = 0;
  stop;

  map = [
    '################',
    '#00000000000000#',
    '#000000###00000#',
    '#00000000000000#',
    '#0#000000000000#',
    '#0#000000000000#',
    '#0#000000000000#',
    '#0#000000000000#',
    '#0#000000000000#',
    '#0#000000000000#',
    '#00000000000000#',
    '#0000000000#000#',
    '#000000000#0000#',
    '###000000##0000#',
    '###000000000000#',
    '################',
  ];

  ngAfterViewInit(): void {
    this.onCreate$.subscribe(this.start);
    this.stop = this.onUpdate$.subscribe(this.update);
    this.construct(this.width, this.height);
  }

  start = () => {
    this.renderer = this.canvas.instance.getContext('2d');
    // (document.getElementsByTagName('body')[0] as HTMLElement)
    //   .addEventListener('keydown', (event) => {
    //     console.log(event);
    //   });
    (document.getElementsByTagName('body')[ 0 ] as HTMLElement)
      .addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'w':
            this.pos.x += 1 * Math.cos(this.pAngle);
            this.pos.y += 1 * Math.sin(this.pAngle);
            // this.velocity.y -= this.step;
            // this.velocity.y = this.velocity.y < -this.maxValue ? -this.maxValue : this.velocity.y;
            break;
          case 'a':
            this.pAngle = (this.pAngle - 0.5) % (2 * Math.PI);
            this.velocity.x -= this.step;
            this.velocity.x = this.velocity.x < -this.maxValue ? -this.maxValue : this.velocity.x;
            break;
          case 's':
            // this.pos.x -= 10 * Math.cos(this.pAngle);
            // this.pos.y -= 10 * Math.sin(this.pAngle);
            // this.velocity.y += this.step;
            // this.velocity.y = this.velocity.y > this.maxValue ? this.maxValue : this.velocity.y;
            break;
          case 'd':
            // this.velocity.x += this.step;
            this.pAngle = (this.pAngle + 0.5) % (2 * Math.PI);
            // this.velocity.x = this.velocity.x > this.maxValue ? this.maxValue : this.velocity.x;
            break;
        }
      });
  }

  update = (elapsed) => {
    elapsed = elapsed / 1000;
    // if ( this.counter ++  > 5) {
    //   this.stop.unsubscribe();
    //   return;
    // }
    this.clear();
    this.renderer.fillStyle = '#ffffff';
    this.renderer.fillText('FPS ' + (1 / elapsed).toFixed(2), 100, 10);
    // this.renderer.fillRect(this.worldCoord(this.pos.x), this.worldCoord(this.pos.y), this.tileSize, this.tileSize);

    const gradient = this.renderer.createLinearGradient(0, this.height, 0, this.height / 2);
    gradient.addColorStop(0, 'brown');
    gradient.addColorStop(1, 'black');
    this.renderer.fillStyle = gradient;
    this.renderer.fillRect(0, this.height / 2, this.width, this.height / 2);
    for (let x = 0; x < this.nTiles; x++) {
      const rayAngle = (this.pAngle - this.fov / 2) + (x / this.nTiles) * this.fov;

      let distanceToWall = 0;
      let wallHit = false;

      while (!wallHit && distanceToWall < 50) {
        distanceToWall += 1;

        const tileX = Math.floor(this.pos.x + distanceToWall * Math.cos(rayAngle));
        const tileY = Math.floor(this.pos.y + distanceToWall * Math.sin(rayAngle));

        if (tileX < 0 || tileX >= this.mapSize || tileY < 0 || tileY >= this.mapSize) {
          wallHit = true;
          // console.log('OOB');
        } else {
          // console.log('checking for ', rayAngle * 180 / Math.PI, tileX, tileY);
          if (this.map[tileY][tileX] === '#') {
            wallHit = true;
            // console.log('HIT', distanceToWall);
          }
        }
      }

      const ceiling = this.height / 2 - (this.height / distanceToWall);
      const floor = this.height - ceiling;
      // console.log('cf', ceiling, floor);
      this.renderer.fillStyle = this.getColorGradient(distanceToWall);
      // console.log(this.getColorGradient(distanceToWall));
      this.renderer.fillRect(this.worldCoord(x), ceiling, this.tileSize, floor - ceiling);
      // for (let y = 0; y < this.tileSize; y++) {
      //   if ( y < ceiling ) {
      //
      //   } else if (y > floor) {
      //     this.renderer.fillStyle = '#00ffff';
      //     this.renderer.fillRect(this.localCoord(x), this.localCoord(y), this.tileSize, this.tileSize);
      //   } else {
      //
      //   }
      // }
    }
    // this.pos.x += this.velocity.x * elapsed;
    // this.pos.y += this.velocity.y * elapsed;
    //
    // this.velocity.x *= this.friction;
    // this.velocity.y *= this.friction;
    //
    // this.pos.x += 90 * elapsed;
    // this.pos.y += 90 * elapsed;
    // this.pos.x = this.pos.x > this.width ? 0 : this.pos.x;
    // this.pos.y = this.pos.y > this.height ? 0 : this.pos.y;
    this.drawMap();
  }


  getColorGradient(distance) {
    const maxDistance = this.mapSize;
    // console.log(distance);
    const gradient = 16 - Math.floor((distance / maxDistance) * 15);
    // gradient = 5;
    // console.log(gradient.toString(16));
    return `#${gradient.toString(16)}${gradient.toString(16)}${gradient.toString(16)}`;
  }

  clear() {
    console.log('clear');
    this.renderer.fillStyle = '#000000';
    this.renderer.fillRect(0, 0, this.width, this.height);
  }

  worldCoord(pos) {
    return pos * this.tileSize - this.tileSize / 2;
  }

  localCoord(pos) {
    return pos - this.tileSize / 2;
  }

  private drawMap() {
    this.renderer.font = '18px Arial';
    this.map.forEach((row, i) => {
      this.renderer.fillText(row, 1, 20 * (i + 1));
    });
    this.renderer.fillStyle = '#00ff00';
    this.renderer.fillText('P',9 * this.pos.x, 20 * this.pos.y);
  }
}
