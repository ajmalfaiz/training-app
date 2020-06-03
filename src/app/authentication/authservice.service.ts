import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;

  

  //WEB api
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('trainin_users')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
   // const  headers = new  HttpHeaders().set('authorization', 'JWT ' + JSON.parse(localStorage.getItem('users')).jwtToken);
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {email, password})
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('trainin_users', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
       // localStorage.setItem('userss', user.user.id);
       // return user;
        }));
  }

  signup( name:string ,email: string, password: string){
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, {name ,email, password})
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
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
