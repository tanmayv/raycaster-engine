import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../auction.service';
import { Auction } from '../auction-tile/auction';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-auction-view',
  templateUrl: './auction-view.component.html',
  styleUrls: ['./auction-view.component.css']
})
export class AuctionViewComponent implements OnInit {

  auction: Auction;
  bid = 0;
  showUserModal = false;

  constructor(private auctionService: AuctionService, private route: ActivatedRoute,
              private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.auction = this.auctionService.currentAuction as Auction;
    console.log(this.auction);
    this.route.queryParamMap.subscribe((queryMap) => {
      if (queryMap.has('id')) {
        const id = queryMap.get('id');
        if (this.auction && !this.auction.id) {
          this.router.navigateByUrl('');
        } else {
          this.auctionService.getAuctionList(id).subscribe((auction) => this.auction = auction);
        }

      } else {
        this.router.navigateByUrl('');
      }
    });
  }

  submit() {
    this.userService.getCurrentUser().subscribe((user) => {
      if (!(user && User.isValid(user))) {
        this.showUserModal = true;
      } else {
        this.auctionService.submitBid(this.auction.id, this.bid).subscribe((bidResponse) => {
          console.log(bidResponse);
        });
      }
    });
  }

  onUserInfo(user, callApi) {
    if (callApi) {
      this.userService.createNewUser(user).subscribe((userResponse) => {
        alert(JSON.stringify(userResponse));
      });
    }
    this.showUserModal = false;
  }

}
