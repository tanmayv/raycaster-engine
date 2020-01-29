import { Component, Input, OnInit } from '@angular/core';
import { MapManagerService } from '../../../game-engine/map-manager.service';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.css']
})
export class MapEditorComponent implements OnInit {

  private map;
  mousedown = false;
  mapKey = 'level1';

  constructor(private mapService: MapManagerService) {

  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.map = this.mapService.getMap(this.mapKey);
    if (this.map) {
      this.map = this.map.data;
    } else {
      alert('map not found');
    }
  }

  onMouseOverTile(x: number, y: number) {
    if (this.mousedown) {
      this.map[y][x] = this.map[y][x] > 0 ? 0 : 1;
      this.mapService.setMap(this.mapKey, this.map);
      this.loadMap();
    }
  }
}
