import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global.variables';
import { User } from '../user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  endpoint: string;
  serverURI: string;
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    this.serverURI = GlobalConstants.serverURI;
    this.endpoint = this.serverURI + '/auth';
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
       return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
      
  }

  // Sign-in
  // signIn(user: User) {
  //   return this.http.post<any>(`${this.endpoint}/signin`, user)
  //     .subscribe((tkn: any) => { 
  //       localStorage.setItem('access_token', tkn.token)
  //       this.getUserProfile(tkn._id).subscribe((res) => {
  //         this.currentUser = res;
  //         var uid = res.msg._id
  //         localStorage.setItem('uid', uid)
  //         this.router.navigate(['home']);
  //       })
  //     })      
  // }

  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
    .pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}