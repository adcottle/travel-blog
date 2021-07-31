import { Injectable } from '@angular/core';
import { Trip } from '../Trip';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudService { 

  // Node/Express API
  endpoint: string = 'http://localhost:4000/trips';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
    public router: Router) { }

 
    // Add
  AddTrip(data: Trip): Observable<any> {
    let api = `${this.endpoint}/add-trip`;
      // console.log(data);
    return this.http.post(api, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all trips
  GetTrips() {
    return this.http.get(`${this.endpoint}/`);
  }

  // Get single trip
  GetTrip(_id:any): Observable<any> {
    let API_URL = `${this.endpoint}/trip/${_id}`;
    return this.http.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Get latest posts
  GetLatest() {
    return this.http.get(`${this.endpoint}/latest-posts`);
  }

  // Update
  updateTrip(_id:any, data:any): Observable<any> {
    let API_URL = `${this.endpoint}/update-trip/${_id}`;
    return this.http.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteTrip(_id:any): Observable<any> {
    let API_URL = `${this.endpoint}/delete-trip/${_id}`;
    return this.http.delete(API_URL, { headers: this.httpHeaders}).pipe(
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