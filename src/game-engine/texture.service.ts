import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextureService {

  constructor() { }

  public textureStorage = {};

  init() {
    const imgTagList: HTMLCollection = document.getElementsByTagName('img');
    for (let i = 0; i < imgTagList.length; i++) {
      const el = imgTagList.item(i);
      this.textureStorage[el.id] = el;
    }

    console.log(this.textureStorage);
  }

  getTexture(key) {
    return this.textureStorage[key];
  }
}
