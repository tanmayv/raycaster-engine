import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Auction } from './auction-tile/auction';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  public currentAuction = null;

  constructor(private configService: ConfigService, private http: HttpClient) { }

  getAuctionList(id?): Observable<any[]> {
    console.log('getting auctions', this.configService.getAuctionsUrl(id));
    return this.http.get<any[]>(this.configService.getAuctionsUrl(id));
  }

  submitBid(auctionId: string, amount: number) {
    return this.http.get(this.configService.getBidsUrl() + `?auctionId=${auctionId}&amount=${amount}`);
  }
}
