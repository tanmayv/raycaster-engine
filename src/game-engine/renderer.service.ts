import { Injectable } from '@angular/core';
import { Camera } from './camera';
import { Map, MapManagerService } from './map-manager.service';
import { TextureService } from './texture.service';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  private width;
  private height;
  private renderer: CanvasRenderingContext2D;
  private wallTexture;

  constructor(private mapService: MapManagerService, private textureService: TextureService) {
  }

  public init(width, height, renderer) {
    this.width = width;
    this.height = height;
    this.renderer = renderer;
    this.wallTexture = this.textureService.getTexture('greystone');
  }

  drawFloor() {
    const gradient = this.renderer.createLinearGradient(0, this.height, 0, this.height / 2);
    gradient.addColorStop(0, 'brown');
    gradient.addColorStop(1, 'black');
    this.renderer.fillStyle = gradient;
    this.renderer.fillRect(0, this.height / 2, this.width, this.height / 2);
  }

  drawWall(mapKey: string, nTiles: number, tileSize: number, camera: Camera) {
    const map: Map = this.mapService.getMap(mapKey);
    for (let x = 0; x < nTiles; x++) {
      const rayAngle = (camera.direction - camera.fov / 2) + (x / nTiles) * camera.fov;

      let distanceToWall = 0;
      let wallHit = false;
      let sampleX;
      let hitY = true;
      while (!wallHit && distanceToWall < 50) {
        distanceToWall += 0.01;

        const tileX = Math.floor(camera.x + distanceToWall * Math.cos(rayAngle));
        const tileY = Math.floor(camera.y + distanceToWall * Math.sin(rayAngle));

        if (tileX < 0 || tileX >= map.width || tileY < 0 || tileY >= map.height) {
          wallHit = true;
        } else {
          if (map.data[tileY][tileX]  > 0) {
            wallHit = true;

            const midX = tileX + 0.5;
            const midY = tileY + 0.5;

            const testX = camera.x + distanceToWall * Math.cos(rayAngle);
            const testY = camera.y + distanceToWall * Math.sin(rayAngle);

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
      if (hitY) {
        this.renderer.fillStyle = 'black';
        this.renderer.fillRect(x * tileSize - tileSize / 2, ceiling, tileSize, floor - ceiling);
        this.renderer.globalAlpha = 0.5;
      }

      const ratio = this.wallTexture.offsetWidth / nTiles;
      this.renderer.drawImage(this.wallTexture, this.wallTexture.offsetWidth * sampleX, 0,
        ratio, this.wallTexture.offsetHeight, x * tileSize - tileSize / 2, ceiling, tileSize, floor - ceiling);
      this.renderer.globalAlpha = 1;
    }

  }

  drawSprites(sprites, camera: Camera) {
    sprites.sort((sp1, sp2) => {
      return Math.pow(sp2.x - camera.x, 2) + Math.pow(sp2.y - camera.y, 2) -
        Math.pow(sp2.x - camera.x, 2) + Math.pow(sp2.y - camera.y, 2);
    });

    sprites.forEach(sprite => {
      const tx = camera.x - sprite.x;
      const ty = camera.y - sprite.y;
      const dAx = - Math.cos(camera.direction);
      const dAy = - Math.sin(camera.direction);
      const dBx = - sprite.x + camera.x;
      const dBy = - sprite.y + camera.y;
      const angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);

      if ( angle < camera.fov / 2 && angle > - camera.fov / 2) {
        const wx = ((angle + camera.fov / 2) / camera.fov) * this.width;
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

        this.renderer.drawImage(this.textureService.getTexture(sprite.imgId), wx, ceil, scaledWidth, scaledHeight);
      }
      //   (Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)) * Math.sqrt(Math.pow(vx, 2) + Math.pow(vx, 2)));
    });

  }
}
