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
  
  public static isValid = (user) => {
    return (user.name && user.addressLine1 && user.state && user.city && user.pincode && (user.email || user.phone));
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  constructor() { }

  getCurrentUser() {
    const thisString = localStorage.getItem('user');
    return thisString && thisString !== 'undefined' ? JSON.parse(thisString) : undefined;
  }

  createNewUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
