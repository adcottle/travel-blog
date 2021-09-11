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
  

  constructor(private httpClient: HttpClient ) {}

   // Get all Images in JSON
   GetImagesList() {
    return this.httpClient.get(`${this.REST_API}/files`);
  }
  
  GetLatest() {
    return this.httpClient.get(`${this.REST_API}/latest-posts`);
  }

  
  //Get Cover photo
  GetCover(album_id:any): Observable<any>  {
    let API_URL = `${this.REST_API}/cover/${album_id}`;
    // console.log(API_URL);
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })      
  }

  // Get single trip
  GetAlbum(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/view-album/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  // Open Image for Modal
  OpenImage(filename: any): Observable<any> {
    let API_URL = `${this.REST_API}/image/${filename}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }
  // Get single image for favorites
  GetFavorite(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/favorite-image/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  //Get list of picture IDs in an album
  GetAlbumList(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/album-images/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }
  
  //Add Comment to Image
  AddComment(id: any, body:any): Observable<any> {
    let API_URL = `${this.REST_API}/add-comment/${id}`;
    // console.log(id);
    // console.log(body);
    return this.httpClient.put(API_URL, body, { headers: this.httpHeaders }).pipe(
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
