import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('trainin_users')));
    this.currentUser = this.currentUserSubject.asObservable();
}
public get currentUserValue() {
  return this.currentUserSubject.value;
}

login(username: string, password: string) {
 // const  headers = new  HttpHeaders().set('authorization', 'JWT ' + JSON.parse(localStorage.getItem('users')).jwtToken);
  return this.http.post<any>(`${environment.apiUrl}/user/get_access_token/`, {username, password})
  .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.access) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('trainin_users', JSON.stringify(user));
          this.currentUserSubject.next(user);
      }
     // localStorage.setItem('userss', user.user.id);
     // return user;
      }));
}
logout() {
// remove user from local storage to log user out
localStorage.removeItem('trainin_users');
sessionStorage.removeItem('trainin_users');
}
}
