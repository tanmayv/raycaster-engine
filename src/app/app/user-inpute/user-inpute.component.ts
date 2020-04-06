import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../user.service';

@Component({
  selector: 'app-user-inpute',
  templateUrl: './user-inpute.component.html',
  styleUrls: ['./user-inpute.component.scss']
})
export class UserInputeComponent implements OnInit {

  user = new User();
  User = User;

  @Output()
  cancel = new EventEmitter<User>();

  @Output()
  submit = new EventEmitter<User>();
  constructor() { }

  ngOnInit() {
  }

}
