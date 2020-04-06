import { Injectable } from '@angular/core';

export class User {
  name: string;
  username: string;
  email: string;
  phone: string;
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
  constructor() { }

  getCurrentUser() {
    const userString = localStorage.getItem('user');
    return userString && userString !== 'undefined' ? JSON.parse(userString) : undefined;
  }

  createNewUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
