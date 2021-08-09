import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../service/images/images.service';
import { CrudService } from '../../service/crud/crud.service';
import { takeUntil } from 'rxjs/operators';
import {  Subject } from 'rxjs';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageModalComponent } from './image-modal/image-modal.component';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

  id:  any;
  albumImage: any = []; 
  Post: any = [];
  Cover: any;


  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private actRoute: ActivatedRoute, 
    private imageService: ImagesService, 
    private crudService: CrudService,
    public dialog: MatDialog,) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getMerged(this.id);
    this.getCover(this.id)
  }

  getMerged(id){   
    let trip;
    var image: any = [];
    this.crudService.GetTrip(id).pipe(takeUntil(this.destroy$)).subscribe( (tripData: any =[]) => {   
      // console.log(tripData)
      this.Post = tripData;
      this.imageService.GetAlbum(id).pipe(takeUntil(this.destroy$)).subscribe( (imageData: any =[]) => {      
       trip = tripData;
        // console.log(trip);
         image = imageData.files
        // console.log(image);         
        image.forEach(element => {          
          const mergedObj = { ...element, ...trip };
          // console.log(mergedObj);
          this.albumImage.push(mergedObj);
          console.log(this.albumImage)
        });
       
      });    
    });    
  };
  
  getCover(id) {
    this.imageService.GetCover(id).pipe(takeUntil(this.destroy$)).subscribe( coverImage => {
      // console.log(coverImage);
      var ci = coverImage.files
      var uri = 'http://localhost:4000/images/file/'
      var CIuri = ci[0].filename;  
      this.Cover = uri + CIuri;
      // console.log(this.Cover); 
    }
  )};


  openModal(filename) {
    this.imageService.OpenImage(filename).pipe(takeUntil(this.destroy$)).subscribe (img => {      
      this.dialog.open(ImageModalComponent,{
        height: '100%',
        width: '100%',
        data:{        
          imageData: img
        }
      }); 
    });    
  };
 

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
