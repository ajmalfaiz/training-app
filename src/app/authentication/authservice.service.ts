import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';
import {JwtTockens} from 'src/app/authentication/jwt.model';


@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;

  

  //WEB api
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    constructor(private http: HttpClient,
      private Jwt_service: JwtService) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('JwtTockens')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


  setToken(Token: JwtTockens) {
    // Save JWT sent from server in localstorage
    this.Jwt_service.saveToken(Token.token);
  
    
   
}

  login(email: string, password: string) {
   // const  headers = new  HttpHeaders().set('authorization', 'JWT ' + JSON.parse(localStorage.getItem('users')).jwtToken);
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {email, password})
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
        
            
           this.setToken(user);
           this.Jwt_service.setUser(JSON.stringify( user.user));
        }
       
        }));
  }

  signup( name:string ,email: string, password: string){
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, {name ,email, password})
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.setToken(user);
           this.Jwt_service.setUser(JSON.stringify( user.user));
        }
      
        }));

  }
  logout() {
  // remove user from local storage to log user out
  this.Jwt_service.destroyToken();
  }
}
