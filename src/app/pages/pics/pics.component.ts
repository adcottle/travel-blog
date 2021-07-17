import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImagesService } from '../../service/images/images.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.css']
})
export class PicsComponent implements OnInit, OnDestroy {

  Images: any = [];
  Lists: any = [];
  Pic: any = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
    this.getList();
    // this.getImages();
    // this.onePic();
  }

  getList() {
    return this.imageService.GetImagesList().pipe(takeUntil(this.destroy$)).subscribe( (data: any =[]) => {
      // console.log(data) 
      this.Pic = data.files.map(({ filename }) => "http://localhost:4000/images/file/"+filename);
      // this.Pic = 'http://localhost:4000/images/file/navajo_bridge.jpg'
      console.log(this.Pic);  
      // this.Images = this.sanitizer.bypassSecurityTrustUrl(this.Pic);
      // console.log(this.Images); 
    }, err => {
      console.log(err);
    }
  )};



  // getList() {
  //   return this.imageService.GetImagesList().pipe(takeUntil(this.destroy$)).subscribe( (data: any =[]) => {
  //     // console.log(data)
  //     var API_URI = 'http://localhost:4000/images/file/';
  //     let result = data.map(({ filename }) => filename)
  //     console.log(result)
  //     var name = data.files.filename;
  //     var imgSrc = API_URI + name;
  //     console.log(data.files.filename)
  //     this.Lists = data.files;
  //     console.log(this.Lists)
  //   }, err => {
  //     console.log(err);
  //   }
  // )};

  getImages() {
    return this.imageService.GetImages().pipe(takeUntil(this.destroy$)).subscribe( (data: any =[]) => {
      console.log(data)
      this.Images = data.files;
    }, err => {
      console.log(err);
    }
  )};

  
  onePic() {var name = 'navajo_bridge.jpg'; return this.imageService.GetPic(name).pipe(takeUntil(this.destroy$)).subscribe( (data) => {
    // console.log(data)
    this.Pic = data;
    console.log(this.Pic)
  }, err => {
    console.log(err);
  }
)};

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  


}

