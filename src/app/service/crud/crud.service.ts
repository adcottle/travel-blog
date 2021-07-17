import { Injectable } from '@angular/core';
import { Trip } from '../Trip';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CrudService { 

  // Node/Express API
  REST_API: string = 'http://localhost:4000/trips';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  AddTrip(data: Trip): Observable<any> {
    let API_URL = `${this.REST_API}/add-trip`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all trips
  GetTrips() {
    return this.httpClient.get(`${this.REST_API}/`);
  }

  // Get single trip
  GetTrip(_id:any): Observable<any> {
    let API_URL = `${this.REST_API}/trip/${_id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateTrip(_id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-trip/${_id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteTrip(_id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-trip/${_id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
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