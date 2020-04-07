import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auction } from './auction';

@Component({
  selector: 'app-auction-tile',
  templateUrl: './auction-tile.component.html',
  styleUrls: ['./auction-tile.component.scss']
})
export class AuctionTileComponent implements OnInit {

  @Input()
  auction: Auction;

  @Output()
  bidClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  viewAuction() {
    this.bidClick.emit();
  }

}
