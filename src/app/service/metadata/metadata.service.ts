import { Injectable } from '@angular/core';
import { Meta } from '../meta';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  // Node/Express API
  endpoint: string = 'http://localhost:4000/meta';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient,
    public router: Router) { }

 
    // Add data to media
  AddMeta(data: Meta): Observable<any> {
    let API_URL = `${this.endpoint}/add-meta`;
      // console.log(data);
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all metadata values
  GetMeta() {
    return this.http.get(`${this.endpoint}/`);
  }

  // Get a single media's metadata
  GetMetaData(_id:any): Observable<any> {
    let API_URL = `${this.endpoint}/media/${_id}`;
    return this.http.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateMeta(_id:any, data:any): Observable<any> {
    let API_URL = `${this.endpoint}/update-meta/${_id}`;
    return this.http.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete metaa
  deleteMeta(_id:any): Observable<any> {
    let API_URL = `${this.endpoint}/delete-meta/${_id}`;
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