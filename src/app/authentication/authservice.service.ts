import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import {map} from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  //Sign Up
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYP_p1a-yS0wB46G5SC_RZLlFL6sj6ttY',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  //Logout
  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this._snackBar.open('You have been Logged Out', 'Done', {
      duration: 2000,
    });
  }
  //Auto-Logout
  // autoLogout(expirationDuration: number){
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expirationDuration)
  // }


  //Login
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYP_p1a-yS0wB46G5SC_RZLlFL6sj6ttY',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  //auto login

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      // this.autoLogout(expirationDuration);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

  //Handle AUthentication

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  //WEB api
  //   private currentUserSubject: BehaviorSubject<any>;
  //   public currentUser: Observable<any>;
  //   constructor(private http: HttpClient) {
  //     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('trainin_users')));
  //     this.currentUser = this.currentUserSubject.asObservable();
  // }
  // public get currentUserValue() {
  //   return this.currentUserSubject.value;
  // }

  // login(username: string, password: string) {
  //  // const  headers = new  HttpHeaders().set('authorization', 'JWT ' + JSON.parse(localStorage.getItem('users')).jwtToken);
  //   return this.http.post<any>(`${environment.apiUrl}/user/get_access_token/`, {username, password})
  //   .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.access) {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('trainin_users', JSON.stringify(user));
  //           this.currentUserSubject.next(user);
  //       }
  //      // localStorage.setItem('userss', user.user.id);
  //      // return user;
  //       }));
  // }
  // logout() {
  // // remove user from local storage to log user out
  // localStorage.removeItem('trainin_users');
  // sessionStorage.removeItem('trainin_users');
  // }
}
