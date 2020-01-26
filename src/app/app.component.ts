import { AfterViewInit, Component } from '@angular/core';
import { GameComponent } from '../game-engine/game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent extends GameComponent implements AfterViewInit {
  tileSize = 10;
  nTiles = 100;
  mapSize = 16;

  width = this.tileSize * this.nTiles;
  height = this.tileSize * this.nTiles;

  renderer: CanvasRenderingContext2D;

  pos = { x: 8, y: 8 };
  pAngle = 0;
  fov = Math.PI / 4;

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

  sprite = {
    x : 5, y : 5, imgId: 'box'
  };

  ngAfterViewInit(): void {
    this.onCreate$.subscribe(this.start);
    this.onUpdate$.subscribe(this.update);
    this.construct(this.width, this.height);
  }

  start = () => {
    this.renderer = this.canvas.instance.getContext('2d');
    // (document.getElementsByTagName('body')[0] as HTMLElement)
    //   .addEventListener('keydown', (event) => {
    //     console.log(event);
    //   });url

    setTimeout(() => {
      const img = document.getElementById(this.sprite.imgId);
      this.renderer.drawImage(img as CanvasImageSource, 10, 10);
      console.log('loading');
    }, 3000);
    (document.getElementsByTagName('body')[ 0 ] as HTMLElement)
      .addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'w':
            const tempX = this.pos.x + 1 * Math.cos(this.pAngle);
            const tempY = this.pos.y + 1 * Math.sin(this.pAngle);
            if (tempX < 0 || tempX >= this.mapSize || tempY < 0 || tempY >= this.mapSize) {
            } else {
              if (this.map[Math.floor(tempY)][Math.floor(tempX)] !== '#') {
                this.pos.x = tempX;
                this.pos.y = tempY;
              } else {
              }
            }
            break;
          case 'a':
            this.pAngle = (this.pAngle - 0.2) % (2 * Math.PI);
            break;
          case 's':
            break;
          case 'd':
            this.pAngle = (this.pAngle + 0.5) % (2 * Math.PI);
            break;
        }
      });
  }

  update = (elapsed) => {
    elapsed = elapsed / 1000;
    this.clear();
    this.renderer.fillStyle = '#ffffff';
    this.renderer.fillText('FPS ' + (1 / elapsed).toFixed(2), 100, 10);

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
        distanceToWall += 0.1;

        const tileX = Math.floor(this.pos.x + distanceToWall * Math.cos(rayAngle));
        const tileY = Math.floor(this.pos.y + distanceToWall * Math.sin(rayAngle));

        if (tileX < 0 || tileX >= this.mapSize || tileY < 0 || tileY >= this.mapSize) {
          wallHit = true;
        } else {
          if (this.map[tileY][tileX] === '#') {
            wallHit = true;
          }
        }
      }

      const ceiling = this.height / 2 - (this.height / distanceToWall);
      const floor = this.height - ceiling;
      this.renderer.fillStyle = this.getColorGradient(distanceToWall);
      this.renderer.fillRect(this.worldCoord(x), ceiling, this.tileSize, floor - ceiling);
    }
    this.drawMap();
  }


  getColorGradient(distance) {
    const maxDistance = this.mapSize;
    const gradient = 16 - Math.floor((distance / maxDistance) * 15);
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
    let px = 9 * this.pos.x;
    let py = 20 * this.pos.y;
    this.renderer.fillStyle = '#00ff00';
    this.renderer.fillText('P', 9 * this.pos.x, 20 * this.pos.y);
    this.renderer.strokeStyle = '#00ff00'
    this.renderer.fillStyle = '#ff0000';
    px += 4;
    py -= 4;

    this.renderer.beginPath();
    this.renderer.moveTo(px, py);
    let angle = this.pAngle - (this.fov / 2);
    this.renderer.lineTo(px + 69 * Math.cos(angle), py + 69 * Math.sin(angle));
    angle = this.pAngle + ((this.fov) / 2);
    this.renderer.lineTo(px + 69 * Math.cos(angle), py + 69 * Math.sin(angle));
    this.renderer.lineTo(px, py);
    this.renderer.stroke();
  }
}
