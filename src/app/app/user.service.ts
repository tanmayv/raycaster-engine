import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

export class User {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address = new Address();
  
  public static isValid = (user) => {
    return (user.name && user.address.addressLine1 && user.address.state && user.address.city
      && user.address.pincode && (user.email || user.phone));
  }
}

export class Address {
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  city: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  constructor(private http: HttpClient, private configService: ConfigService) { }

  getCurrentUser() {
    const username = localStorage.getItem('username');
    if (username) {
      return this.http.get(this.configService.getUserUrl(username));
    } else {
      return of(undefined);
    }
  }

  createNewUser(user) {
    return this.http.post(this.configService.getUserUrl(), user).pipe(tap((userResponse: User) => {
      localStorage.setItem('username', userResponse.username);
    }));
  }

  updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
