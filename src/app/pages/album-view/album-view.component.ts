import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../service/images/images.service';
import { CrudService } from '../../service/crud/crud.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {

  id:  any;
  albumImage: any = [];
  // Images: any = [];
  Post: any = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private actRoute: ActivatedRoute, private imageService: ImagesService, private crudService: CrudService) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getMerged(this.id)
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
          console.log(mergedObj);
          this.albumImage.push(mergedObj);
          // console.log(this.albumImage)
        });
       
      });    
    });    
  };
  


  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
