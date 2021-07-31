import { Injectable } from '@angular/core';
import { Image } from '../image';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
    // Node/Express API
    REST_API: string = 'http://localhost:4000/images';

    // Http Header
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

   // Get all Images in JSON
   GetImagesList() {
    return this.httpClient.get(`${this.REST_API}/files`);
  }
  
  GetLatest() {
    return this.httpClient.get(`${this.REST_API}/latest-posts`);
  }

  GetPic(_id:any) {
    let API_URL = `${this.REST_API}/file/${_id}`;
    console.log(API_URL);
    return this.httpClient.get(API_URL, { responseType: 'blob' })      
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
