import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent implements OnInit {

  auctions = [];
  constructor(private auctionService: AuctionService, private router: Router) { }

  ngOnInit() {
    this.auctionService.getAuctionList().subscribe((list) => this.auctions = list);
  }

  viewAuction(auction) {
    this.auctionService.currentAuction = auction;
    this.router.navigateByUrl('auction?id=' + auction.id);
  }

}
