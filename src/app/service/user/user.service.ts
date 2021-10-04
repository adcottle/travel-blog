import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global.variables';
import { User } from '../user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Node/Express API
  endpoint: string;
  serverURI: string; 
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient,
    public router: Router) {
      this.serverURI = GlobalConstants.serverURI;
      this.endpoint = this.serverURI + '/users';
     }

  // Get User Names
  getUserProfile(id): Observable<any> {
    let API_URL = `${this.endpoint}/user-name/${id}`;
    return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(      
      catchError(this.handleError)
    )
  }

  //Get a list favorites
  GetMyFavorites(id: any): Observable<any> {
    return this.http.get(`${this.endpoint}/my-favorites/${id}`);
  }

  // Update
  AddFavorite(id:any, img_id:any): Observable<any> {
    let API_URL = `${this.endpoint}/add-favorites/${id}/${img_id}`;
    return this.http.put(API_URL,{ headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  //Remove a favorite
  deleteFavorite(id:any, img_id: any): Observable<any> {
    // console.log('made it to service' + '     ' + id  + '     ' + img_id)
    let  API_URL = `${this.endpoint}/delete-favorite/${id}/${img_id}`;
    return this.http.delete( API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}