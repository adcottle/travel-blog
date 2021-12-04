import { Injectable } from '@angular/core';
import { GlobalConstants } from '../global.variables';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  // Node/Express API
  REST_API: string;
  serverURI: string;


  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) {
    this.serverURI = GlobalConstants.serverURI;
    this.REST_API = this.serverURI + '/images';
  }

  // Get all Images in JSON
  GetImagesList() {
    return this.httpClient.get(`${this.REST_API}/files`);
  }

  GetLatest() {
    return this.httpClient.get(`${this.REST_API}/latest-posts`);
  }


  //Get Cover photo
  GetCover(album_id: any): Observable<any> {
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
  };
  //  //Get Album Comments
  GetAlbumComments(id: any): Observable<any> {
    //  console.log(id)     
    let API_URL = `${this.REST_API}/album-comments/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map(res => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  //AddComment to Image
  AddComment(id: any, data: any) {
    let API_URL = `${this.REST_API}/add-comment/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .subscribe(data => {
      });
  }

  //Add tags to Image
  AddTags(id: any, data: any) {
    let API_URL = `${this.REST_API}/add-tags/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  //Remove a comment
  deleteComment(img_id: any, c_id: any): Observable<any> {
    // console.log('made it to service' + '     ' + img_id  + '     ' + c_id)
    let API_URL = `${this.REST_API}/delete-comment/${img_id}/${c_id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
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
