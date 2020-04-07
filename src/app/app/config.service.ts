import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  defaultHost = 'aHR0cDovLzM1LjIyMi4yMTIuMjM4Lw==';

  constructor() { }

  getAuctionsUrl(id?: string) {
    return this.buildUrl('auctionItem' + (id ? ('?id=' + id) : ''));
  }

  getBidsUrl() {
    return this.buildUrl('bid');
  }

  getUserUrl(username?) {
    return this.buildUrl('user' + (username ? ('?username=' + username) : ''));
  }

  buildUrl(path) {

    return `${atob(localStorage.getItem('host') || this.defaultHost)}${path}`;
  }
}
