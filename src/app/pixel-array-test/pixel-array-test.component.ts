import { Component, OnInit } from '@angular/core';
import { GameComponent } from '../../game-engine/game/game.component';

@Component({
  selector: 'app-pixel-array-test',
  templateUrl: './pixel-array-test.component.html',
  styleUrls: ['./pixel-array-test.component.css']
})
export class PixelArrayTestComponent extends GameComponent implements OnInit {

  ngOnInit() {
    this.construct(200, 200);
    this.onCreate$.subscribe(this.start);
    this.onUpdate$.subscribe(this.update);
  }

  start = () => {
    const barrel = document.getElementById('barrel');
    // const barrel = document.getElementById('greenlight');
    console.log('start');
    this.renderer.fillStyle = 'red';
    this.renderer.fillRect(0, 0, this.width, this.height);
    const imgData = this.renderer.createImageData(10, 10);
    console.log(imgData);
    console.log(barrel);
    // this.renderer.globalAlpha = 0.5;
    // this.renderer.drawImage(barrel, 0, 0, barrel.naturalWidth / 20, barrel.naturalHeight, 0, 0, 10, this.height);
    // this.renderer.globalAlpha = 1;
    // this.renderer.drawImage(barrel, barrel.naturalWidth / 20, 0, barrel.naturalWidth / 20, barrel.naturalHeight, 10, 0, 10, this.height);
  }

  update = () => {
    // this.renderer.fillStyle = 'black';
    // this.renderer.fillRect(0, 0, this.width, this.height);
  }


}
