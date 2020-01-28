import { AfterViewInit, Component } from '@angular/core';
import { GameComponent } from '../game-engine/game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent extends GameComponent implements AfterViewInit {
  tileSize = 8;
  nTiles = 160;
  mapSize = 24;

  width = this.tileSize * this.nTiles;
  height = this.tileSize * this.nTiles;

  renderer: CanvasRenderingContext2D;

  pos = { x: 13, y: 15 };
  velocity = { x: 0, y: 0};
  friction = 0.8;
  pAngle = 0;
  fov = Math.PI / 4;
  key = {};

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  imgDictionary = {};
  sprites = [{
    x : 11, y : 11, imgId: 'barrel',
    scale: 0.5, resolution: 2,
    floorAlign: true
  },
    {
      x : 18, y : 12, imgId: 'greenlight',
      scale: 0.5, resolution: 2,
      floorAlign: false
    }
  ];

  wallTexture;

  ngAfterViewInit(): void {
    this.onCreate$.subscribe(this.start);
    this.onUpdate$.subscribe(this.update);
    this.construct(this.width, this.height);
  }

  start = () => {
    this.wallTexture = document.getElementById('greystone');
    this.sprites.forEach(sprite => {
      if (!this.imgDictionary[sprite.imgId]) {
        const img = document.getElementById(sprite.imgId);
        this.imgDictionary[sprite.imgId] = img;
      }
    });

    (document.getElementsByTagName('body')[ 0 ] as HTMLElement)
      .addEventListener('keydown', (event) => {
        this.key[event.key] = true;
      });
    (document.getElementsByTagName('body')[ 0 ] as HTMLElement)
      .addEventListener('keyup', (event) => {
        this.key[event.key] = false;
      });
  }

  update = (elapsed) => {
    this.clear();
    this.handleInputs(elapsed);
    const tempX = this.pos.x + this.velocity.x;
    const tempY = this.pos.y + this.velocity.y;
    if (tempX < 0 || tempX >= this.mapSize || tempY < 0 || tempY >= this.mapSize) {
    } else {
      if (this.map[Math.floor(tempY)][Math.floor(tempX)] === 0) {
        this.pos.x = tempX;
        this.pos.y = tempY;
      } else {
      }
    }
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.renderer.fillStyle = '#ffffff';
    this.renderer.fillText('FPS ' + (1 / elapsed).toFixed(2), 100, 10);

    const gradient = this.renderer.createLinearGradient(0, this.height, 0, this.height / 2);
    gradient.addColorStop(0, 'brown');
    gradient.addColorStop(1, 'black');
    this.renderer.fillStyle = gradient;
    this.renderer.fillRect(0, this.height / 2, this.width, this.height / 2);
    const floorList = [];
    let hitOffSetX;
    for (let x = 0; x < this.nTiles; x++) {
      const rayAngle = (this.pAngle - this.fov / 2) + (x / this.nTiles) * this.fov;

      let distanceToWall = 0;
      let wallHit = false;
      let sampleX;
      let hitY = true;
      while (!wallHit && distanceToWall < 50) {
        distanceToWall += 0.01;

        const tileX = Math.floor(this.pos.x + distanceToWall * Math.cos(rayAngle));
        const tileY = Math.floor(this.pos.y + distanceToWall * Math.sin(rayAngle));

        if (tileX < 0 || tileX >= this.mapSize || tileY < 0 || tileY >= this.mapSize) {
          wallHit = true;
        } else {
          if (this.map[tileY][tileX]  > 0) {
            wallHit = true;

            const midX = tileX + 0.5;
            const midY = tileY + 0.5;

            const testX = this.pos.x + distanceToWall * Math.cos(rayAngle);
            const testY = this.pos.y + distanceToWall * Math.sin(rayAngle);

            const testAngle = Math.atan2(testY - midY, testX - midX);

            if (testAngle >= -Math.PI * 0.25 && testAngle < Math.PI * 0.25) {
              sampleX = testY % 1;
              hitY = true;
            }
            if (testAngle >= Math.PI / 4 && testAngle < Math.PI * 0.75) {
              sampleX = testX % 1;
              hitY = false;
            }
            if (testAngle < -Math.PI / 4 && testAngle >= -Math.PI * 0.75) {
              sampleX = testX % 1;
              hitY = false;
            }
            if (testAngle >= Math.PI * 0.75 || testAngle < -Math.PI * 0.75) {
              sampleX = testY % 1;
              hitY = true;
            }

          }
        }
      }

      const ceiling = this.height / 2 - (this.height / distanceToWall);
      const floor = this.height - ceiling;
      floorList.push(ceiling);
      this.renderer.fillStyle = this.getColorGradient(distanceToWall);
      if (hitY) {
        this.renderer.fillStyle = 'black';
        this.renderer.fillRect(this.worldCoord(x), ceiling, this.tileSize, floor - ceiling);
        this.renderer.globalAlpha = 0.5;
      }

      const ratio = this.wallTexture.offsetWidth / this.nTiles;
      this.renderer.drawImage(this.wallTexture, this.wallTexture.offsetWidth * sampleX, 0, ratio, this.wallTexture.offsetHeight, this.worldCoord(x), ceiling, this.tileSize, floor - ceiling);
      this.renderer.globalAlpha = 1;
    }

    this.sprites.sort((sp1, sp2) => {
      return Math.pow(sp2.x - this.pos.x, 2) + Math.pow(sp2.y - this.pos.y, 2) -
        Math.pow(sp2.x - this.pos.x, 2) + Math.pow(sp2.y - this.pos.y, 2);
    });

    this.sprites.forEach(sprite => {
      const tx = this.pos.x - sprite.x;
      const ty = this.pos.y - sprite.y;
      const dAx = - Math.cos(this.pAngle);
      const dAy = - Math.sin(this.pAngle);
      const dBx = - sprite.x + this.pos.x;
      const dBy = - sprite.y + this.pos.y;
      const angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);

      if ( angle < this.fov / 2 && angle > -this.fov / 2) {
        const wx = ((angle + this.fov / 2) / this.fov) * this.width;
        const distance = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
        let ceil = this.height / 2 - (this.height / distance);
        const flr = this.height - ceil;
        const spriteHeight = this.height - 2 * ceil;
        const scaledHeight = spriteHeight * sprite.scale;
        const scaledWidth = scaledHeight / sprite.resolution;
        if (sprite.floorAlign) {
          ceil += spriteHeight - scaledHeight;
        }

        this.renderer.fillStyle = 'green';

        this.renderer.drawImage(this.imgDictionary[sprite.imgId], wx, ceil, scaledWidth, scaledHeight);
      }
      //   (Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)) * Math.sqrt(Math.pow(vx, 2) + Math.pow(vx, 2)));
    });
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
    this.renderer.fillStyle = 'white';
    this.renderer.font = '18px Arial';
    this.map.forEach((row, i) => {
      row.forEach((char, j) => {
        if (char > 0) {
          this.renderer.fillStyle = 'brown';
        } else {
          this.renderer.fillStyle = 'white';
        }
        this.renderer.fillText(char + '', 9 * j, 20 * (i + 1));
      })
    });
    let px = 9 * this.pos.x;
    let py = 20 * this.pos.y;
    this.renderer.fillStyle = '#ffaaaff00';
    this.renderer.fillText('P', 9 * this.pos.x, 20 * this.pos.y);
    this.sprites.forEach(sprite => {
      this.renderer.fillText('E', 9 * sprite.x, 20 * sprite.y);
    })
    this.renderer.strokeStyle = '#00ff00'
    this.renderer.fillStyle = '#ff0000';
    const oldLine = this.renderer.lineWidth;
    this.renderer.lineWidth = 5;
    px += 4;
    py -= 4;

    this.renderer.beginPath();
    this.renderer.moveTo(px, py);
    let angle = this.pAngle - (this.fov / 2);
    this.renderer.lineTo(px + 69 * Math.cos(angle), py + 69 * Math.sin(angle));
    angle = this.pAngle + ((this.fov) / 2);
    this.renderer.lineTo(px + 69 * Math.cos(angle), py + 69 * Math.sin(angle));
    this.renderer.lineTo(px, py);
    this.renderer.lineTo(px + 60 * Math.cos(this.pAngle), py + 60 * Math.sin(this.pAngle))
    this.renderer.stroke();
    this.renderer.lineWidth = oldLine;
  }

  private handleInputs(elapsed) {
    if (this.key['w']) {
     this.velocity.x += 1 * Math.cos(this.pAngle) * elapsed / 1000;
     this.velocity.y += 1 * Math.sin(this.pAngle) * elapsed / 1000;
    } else {
      if (this.key['s']) {
        this.velocity.x -= 1 * Math.cos(this.pAngle) * elapsed / 1000;
        this.velocity.y -= 1 * Math.sin(this.pAngle) * elapsed / 1000;
      }
    }

    if (this.key['a']) {
      this.pAngle = (this.pAngle - 1 * elapsed / 1000) % (2 * Math.PI);
    } else {
      if (this.key['d']) {
        this.pAngle = (this.pAngle + 1 * elapsed / 1000) % (2 * Math.PI);
      }
    }
  }
}
