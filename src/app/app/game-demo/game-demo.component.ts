import { AfterViewInit, Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { GameComponent } from '../../../game-engine/game/game.component';
import { Camera } from '../../../game-engine/camera';
import { RendererService } from '../../../game-engine/renderer.service';
import { TextureService } from '../../../game-engine/texture.service';
import { MapManagerService } from '../../../game-engine/map-manager.service';

@Component({
  selector: 'app-game-demo',
  templateUrl: './game-demo.component.html',
  styleUrls: ['./game-demo.component.css']
})
export class GameDemoComponent extends GameComponent implements AfterViewInit {

  tileSize = 4;
  nTiles = 240;
  mapSize = 24;

  width = this.tileSize * this.nTiles;
  height = this.tileSize * this.nTiles;

  renderer: CanvasRenderingContext2D;

  pos = { x: 13, y: 15 };
  velocity = { x: 0, y: 0 };
  friction = 0.8;
  pAngle = - Math.PI / 3;
  fov = Math.PI / 4;
  key = {};

  mapKey = 'level1';
  keyForEditor;

  map;
  imgDictionary = {};
  sprites = [ {
    x: 11, y: 11, imgId: 'barrel',
    scale: 0.5, resolution: 2,
    floorAlign: true
  },
    {
      x: 18, y: 12, imgId: 'greenlight',
      scale: 0.5, resolution: 2,
      floorAlign: false
    }
  ];

  wallTexture;
  private camera: Camera = new Camera(this.pos.x, this.pos.y, this.pAngle, this.fov);

  constructor(private renderService: RendererService,
              public resolver: ComponentFactoryResolver, private mapService: MapManagerService,
              private textureService: TextureService
  ) {
    super(resolver);
  }

  ngAfterViewInit(): void {
    this.onCreate$.subscribe(this.start);
    this.onUpdate$.subscribe(this.update);
    this.construct(this.width, this.height);
  }

  start = () => {
    this.map = this.mapService.getMap(this.mapKey);
    console.log(this.map);
    this.map = this.map.data;
    this.textureService.init();
    this.renderService.init(this.width, this.height, this.renderer);
    this.wallTexture = document.getElementById('greystone');
    this.sprites.forEach(sprite => {
      if (!this.imgDictionary[ sprite.imgId ]) {
        const img = document.getElementById(sprite.imgId);
        this.imgDictionary[ sprite.imgId ] = img;
      }
    });

    (document.getElementsByTagName('body')[ 0 ] as HTMLElement)
      .addEventListener('keydown', (event) => {
        this.key[ event.key ] = true;
      });
    (document.getElementsByTagName('body')[ 0 ] as HTMLElement)
      .addEventListener('keyup', (event) => {
        this.key[ event.key ] = false;
      });
  };

  update = (elapsed) => {
    this.clear();
    this.handleInputs(elapsed);
    const tempX = this.camera.x + this.velocity.x;
    const tempY = this.camera.y + this.velocity.y;
    if (tempX < 0 || tempX >= this.mapSize || tempY < 0 || tempY >= this.mapSize) {
    } else {
      if (this.map[ Math.floor(tempY) ][ Math.floor(tempX) ] === 0) {
        this.camera.x = tempX;
        this.camera.y = tempY;
      } else {
      }
    }
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.renderer.fillStyle = '#ffffff';
    this.renderer.fillText('FPS ' + (1 / elapsed).toFixed(2), 100, 10);

    this.renderService.drawFloor();
    this.renderService.drawWall(this.mapKey, this.nTiles, this.tileSize, this.camera);
    this.renderService.drawSprites(this.sprites, this.camera);
    this.drawMap();
  };
  steps = [
    {
      text: 'First step',
      state: ['complete'],
      optionalText: 'optional',
    },
    {
      text: 'Second step',
      state: ['current'],
      tooltip: { content: 'Overflow tooltip content.', trigger: 'click', placement: 'bottom' },
    }
  ];

  current = 3;


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
      });
    });
    let px = 9 * this.camera.x;
    let py = 20 * this.camera.y;
    this.renderer.fillStyle = '#ffaaaff00';
    this.renderer.fillText('P', 9 * this.camera.x, 20 * this.camera.y);
    this.sprites.forEach(sprite => {
      this.renderer.fillText('E', 9 * sprite.x, 20 * sprite.y);
    });
    this.renderer.strokeStyle = '#00ff00';
    this.renderer.fillStyle = '#ff0000';
    const oldLine = this.renderer.lineWidth;
    this.renderer.lineWidth = 5;
    px += 4;
    py -= 4;

    this.renderer.beginPath();
    this.renderer.moveTo(px, py);
    let angle = this.camera.direction - (this.fov / 2);
    this.renderer.lineTo(px + 69 * Math.cos(angle), py + 69 * Math.sin(angle));
    angle = this.camera.direction + ((this.fov) / 2);
    this.renderer.lineTo(px + 69 * Math.cos(angle), py + 69 * Math.sin(angle));
    this.renderer.lineTo(px, py);
    this.renderer.lineTo(px + 60 * Math.cos(this.camera.direction), py + 60 * Math.sin(this.camera.direction));
    this.renderer.stroke();
    this.renderer.lineWidth = oldLine;
  }

  private handleInputs(elapsed) {
    if (this.key[ 'w' ]) {
      this.velocity.x += 1 * Math.cos(this.camera.direction) * elapsed / 1000;
      this.velocity.y += 1 * Math.sin(this.camera.direction) * elapsed / 1000;
    } else {
      if (this.key[ 's' ]) {
        this.velocity.x -= 1 * Math.cos(this.camera.direction) * elapsed / 1000;
        this.velocity.y -= 1 * Math.sin(this.camera.direction) * elapsed / 1000;
      }
    }

    if (this.key[ 'a' ]) {
      this.camera.direction = (this.camera.direction - 1 * elapsed / 1000) % (2 * Math.PI);
    } else {
      if (this.key[ 'd' ]) {
        this.camera.direction = (this.camera.direction + 1 * elapsed / 1000) % (2 * Math.PI);
      }
    }
  }

}
