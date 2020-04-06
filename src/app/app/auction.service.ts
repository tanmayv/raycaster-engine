import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Auction } from './auction-tile/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  public auctionIndex = null;

  auctions = [
    {
      id : '1',
      image: 'https://picsum.photos/400/600',
      title: 'Auction Item 1',
      description: 'A Kathak dancer in her traditional Indian dance attire. Embracing the spirit of a light hearted woman in an earthy background.'
    },
    {
      id : '2',
      image: 'https://picsum.photos/400/600',
      title: 'Auction Item 2',
      description: 'Fallen maple is one of my early paintings. I\'ve always found venation of leaves so much similar to that of human palm lines. I remember spending excessive time re-aligning these lines and shading the maple.'
    },
    {
      id : '3',
      image: 'https://picsum.photos/400/600',
      title: 'Auction Item 3',
      description: 'Sunset is one of the few free pleasures which is accessible to all. Nature does not discriminate between living beings when it provides us all with its supreme aesthetic moments like rainbows, sunsets, waterfalls and rains.\n' +
        'Embracing one such event of our daily lives in this painting. A simple sunset. '
    },
    {
      id : '4',
      image: 'https://picsum.photos/400/600',
      title: 'Auction Item 4',
      description: 'One of my recent paintings. It is probably the most vivid and colorful piece I ever painted.\n' +
        'To balance the colors, I\'ve kept the background pitch dark with a delicate floppy tree. '
    },
  ];

  constructor() { }

  getAuctionList(): Observable<any[]> {
    return of(this.auctions);
  }

  getCurrentAuction() {
    console.log(this.auctionIndex);
    return !!this.auctionIndex || this.auctionIndex === 0? this.auctions[this.auctionIndex] : new Auction();
  }
}
