import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { Auction } from '../auction-tile/auction';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-auction-view',
  templateUrl: './auction-view.component.html',
  styleUrls: ['./auction-view.component.css']
})
export class AuctionViewComponent implements OnInit {

  auction: Auction;
  bid: number = 0;
  constructor(private auctionService: AuctionService, private route: ActivatedRoute,
              private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.auction = this.auctionService.getCurrentAuction() as Auction;
    console.log(this.auction);
    this.route.queryParamMap.subscribe((queryMap) => {
      if (queryMap.has('id')) {
        const id = queryMap.get('id');
        if (this.auction && !this.auction.id) {
          this.router.navigateByUrl('');
        }
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

  submit() {
    const user = this.userService.getCurrentUser();
    if (!user) {

    }
  }

}
