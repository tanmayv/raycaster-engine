import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapManagerService {

  private mapStorage = {};

  constructor() { }

  public setMap(key: string, map: any[][]) {
    this.mapStorage[key] = Map.getInstance(map);
  }

  getMap(mapKey: string) {
    return this.mapStorage[mapKey];
  }
}

export class Map {
  public width: number;
  public height: number;
  public data: any[][];

  public static getInstance(data: any[][]) {
    const map = new Map();
    map.data = data;
    map.width = data.length > 0 ? data[0].length : 0;
    map.height = data.length;
    return map;
  }

  public splice(x, y, dx, dy) {
    const data = [];
    if (x < this.width && y < this.height) {
      for (let i = y; i < dy && i < this.height; i++) {
        const row = [];
        for (let j = x; j < dx && j < this.width; j++) {
          row.push(data[i][j]);
        }
        data.push(row);
      }
    }
    return Map.getInstance(this.data);
  }

}
