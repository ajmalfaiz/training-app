import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private _jwtToken: string = null;
  constructor() { }

  getToken(): string {
    return this._jwtToken || window.localStorage.JwtTockens;
}

saveToken(token: string) {
    this._jwtToken = token;
    window.localStorage.JwtTockens = token;
}
setUser(user){
  // localStorage.setItem('user_details', user.user);
  window.localStorage.setItem('user_details',user);
  
}

destroyToken() {
    this._jwtToken = null;
    window.localStorage.removeItem('JwtTockens');
    window.localStorage.removeItem('user_details');
}
}
