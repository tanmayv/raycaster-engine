import { Component, OnInit } from '@angular/core';
import { GameComponent } from '../../game-engine/game/game.component';
import { Vector } from '../vector';
import { falseIfMissing } from 'protractor/built/util';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-raycaster',
  templateUrl: './raycaster.component.html',
  styleUrls: ['./raycaster.component.css']
})
export class RaycasterComponent extends GameComponent implements OnInit {

  private mapW = 24;
  private mapH = 24;
  private tileSize = 10;
  private tileW = 64;
  private tileH = 48;

  private map = [
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

  private pPos: Vector;
  private pDir: Vector;
  private cameraPlane: Vector;

  private key = {
    w : false,
    a : false,
    s : false,
    d : false
  }

  ngOnInit() {
    this.onCreate$.subscribe(this.start);
    this.onUpdate$.subscribe(this.update);
    this.construct(this.tileW * this.tileSize, this.tileH * this.tileSize, 45);
  }

  start = () => {
    this.renderer = this.canvas.instance.getContext('2d');
    this.pPos = new Vector(15, 14);
    this.pDir = new Vector(-1, 0);
    this.cameraPlane = new Vector(0, 0.66);
    (document.getElementsByTagName('body')[0]).addEventListener('keydown', (event) => {
        this.key[event.key] = true;
    });
    (document.getElementsByTagName('body')[0]).addEventListener('keyup', (event) => {
        this.key[event.key] = false;
    });
  }

  update = (elapsed) => {
    this.clear();
    this.renderer.fillStyle = 'white';
    this.renderer.font = '16px monospace';
    this.renderer.fillText('FPS: ' + (1000 / elapsed).toPrecision(3), 20, 20);
    this.renderer.fillText('Pos: ' + JSON.stringify(this.pPos), 20, 40);
    this.renderer.fillText('Dir: ' + JSON.stringify(this.pDir), 20, 60);

    for (let x = 0; x < this.width; x++) {
      const cameraX = 2 * x / this.width - 1;
      const rayDir = new Vector(this.pDir.x + this.cameraPlane.x * cameraX, this.pDir.y + this.cameraPlane.y * cameraX);

      const mapPos = new Vector(Math.floor(this.pPos.x), Math.floor(this.pPos.y));
      const sideDist = new Vector(0, 0);
      const deltaDist = new Vector(Math.abs(1 / rayDir.x), Math.abs(1 / rayDir.y));
      let perpWallDist = 0;

      const step = new Vector(0, 0);

      let wallHit = false;
      let xHitDir = false;

      if (rayDir.x < 0) {
        step.x = -1;
        sideDist.x = (this.pPos.x - mapPos.x) * deltaDist.x;
      } else {
        step.x = 1;
        sideDist.x = (mapPos.x + 1 - this.pPos.x) + deltaDist.x;
      }
      if (rayDir.y < 0) {
        step.y = -1;
        sideDist.y = (this.pPos.y - mapPos.y) * deltaDist.y;
      } else {
        step.y = 1;
        sideDist.y = (mapPos.y + 1 - this.pPos.y) + deltaDist.y;
      }

      // Perform DDA to calculate wall distance

      while (!wallHit) {
        if (sideDist.x < sideDist.y) {
          sideDist.x += deltaDist.x;
          mapPos.x += step.x;
          xHitDir = true;
        } else {
          sideDist.y += deltaDist.y;
          mapPos.y += step.y;
          xHitDir = false;
        }

        wallHit = this.map[ mapPos.x ][ mapPos.y ] > 0;
      }

      perpWallDist = xHitDir ? (mapPos.x - this.pPos.x + (1 - step.x) / 2) / rayDir.x :
        (mapPos.y - this.pPos.y + (1 - step.y) / 2) / rayDir.y;

      const lineHeight = Math.floor(this.height / perpWallDist);
      let drawStart = (this.height - lineHeight) / 2;
      let drawEnd = (this.height + lineHeight) / 2;
      drawStart = drawStart < 0 ? 0 : drawStart;
      drawEnd = drawEnd > this.height - 1 ? this.height - 1 : drawEnd;

      let wallColor;
      switch (this.map[mapPos.x][mapPos.y]) {
        case 1:
          wallColor = 'red';
          break;
        case 2:
          wallColor = 'green';
          break;
        case 3:
          wallColor = 'blue';
          break;
        case 4:
          wallColor = 'yellow';
          break;
        default:
          wallColor = 'yellow';
      }
      wallColor = (xHitDir ? '' : 'dark') + wallColor;
      this.renderer.beginPath();
      this.renderer.strokeStyle = wallColor;
      this.renderer.moveTo(x, drawStart);
      this.renderer.lineTo(x, drawEnd);
      this.renderer.stroke();
      this.renderer.closePath();
    }

    const moveSpeed = 5 * (elapsed / 1000);
    const rotSpeed = 1 * (elapsed / 1000);
    const relativePos = new Vector(this.pDir.x * moveSpeed, this.pDir.y * moveSpeed);
    if (this.key.w) {
      if (!this.map[Math.floor(this.pPos.x + relativePos.x)][Math.floor(this.pPos.y)]) {
        this.pPos.x += relativePos.x;
      }
      if (!this.map[Math.floor(this.pPos.x)][Math.floor(this.pPos.y + relativePos.y)]) {
        this.pPos.y += relativePos.y;
      }
    }
    if (this.key.s) {
      if (!this.map[Math.floor(this.pPos.x - relativePos.x)][Math.floor(this.pPos.y)]) {
        this.pPos.x -= relativePos.x;
      }
      if (!this.map[Math.floor(this.pPos.x)][Math.floor(this.pPos.y - relativePos.y)]) {
        this.pPos.y -= relativePos.y;
      }
    }

    if (this.key.a || this.key.d) {
      const multiplier = this.key.a ? 1 : -1;
      this.pDir = this.rotateVec(this.pDir, multiplier * rotSpeed);
      this.cameraPlane = this.rotateVec(this.cameraPlane, multiplier * rotSpeed);
    }
  }

  rotateVec(vector, angle) {
    const oldx = vector.x;
    vector.x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
    vector.y = oldx * Math.sin(angle) + vector.y * Math.cos(angle);
    return vector;
  }

  clear() {
    this.renderer.fillStyle = 'black';
    this.renderer.fillRect(0, 0, this.width, this.height);
  }

}
