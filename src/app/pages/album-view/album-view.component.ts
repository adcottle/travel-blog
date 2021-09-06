import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../service/images/images.service';
import { CrudService } from '../../service/crud/crud.service';
import { UserService } from '../../service/user/user.service';
import { takeUntil } from 'rxjs/operators';
import {  merge, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit, OnDestroy {

  id:  any;
  albumImage: any = []; 
  Post: any = [];
  Cover: any;
  commentForm: FormGroup;
  submitted = false;
  Favorites: any = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private actRoute: ActivatedRoute, 
    private imageService: ImagesService, 
    private crudService: CrudService,
    private userService: UserService,
    public dialog: MatDialog, public fb: FormBuilder) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]]      
    })

   }
   get f() { return this.commentForm.controls; }

  ngOnInit() {
    this.getMerged(this.id);
    this.getCover(this.id);
  }

  getMerged(id){   
    var image: any = [];    
    this.crudService.GetTrip(id).pipe(takeUntil(this.destroy$)).subscribe( (tripData: any =[]) => {
      this.Post = tripData;
      this.imageService.GetAlbum(id).pipe(takeUntil(this.destroy$)).subscribe( (imageData: any =[]) => {         
        var t = [tripData];
        image = imageData;  
        // let imgs = image.map(function(el){return{id: el._id}});
        var uid = localStorage.getItem('user');
        this.myFavorites(uid, image); 
        image.forEach(element => {  
          const mergedObj = { ...t, ...element };   
          this.albumImage.push(mergedObj);                     
        });                 
      });    
    });    
  }; 

  myFavorites(uid, imgs) {   
    this.userService.GetMyFavorites(uid).pipe(takeUntil(this.destroy$)).subscribe( res => {
      var pip = res.favorites;
      const haveIds = new Set(pip.map(({ _id }) => _id));
      var result = imgs.map(({ _id }) => ({ _id, favorite: haveIds.has(_id) }));
      this.Favorites = result;
      // console.log(this.Favorites);
    });  
  };

  // myFavorites(uid, imgs) {   
  //   this.userService.GetMyFavorites(uid).pipe(takeUntil(this.destroy$)).subscribe( res => {
  //     // console.log(res.favorites);
  //     var pip = res.favorites;
  //     var match = pip.map(function(el){return{id: el._id}});
  //     const haveIds = new Set(match.map(({ id }) => id));
  //     // console.log(haveIds);
  //     const result = imgs.map(({ id }) => ({ id, favorite: haveIds.has(id) }));
  //     this.Favorites = result;
  //   });  
    
  // };

  getCover(id) {
    this.imageService.GetCover(id).pipe(takeUntil(this.destroy$)).subscribe( coverImage => {
      var ci = coverImage
      var uri = 'http://localhost:4000/images/file/'
      var CIuri = ci[0].filename;  
      this.Cover = uri + CIuri; 
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

  addComment(id) {    
    this.submitted = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }
    // this.authService.signIn(this.loginForm.value)
    console.log(this.commentForm.value)
    var user_id = localStorage.getItem('user');
    console.log(user_id);
    console.log(id);
    this.commentForm.reset();
  }

  makeFavorite(id){
    var user_id = localStorage.getItem('user');
    this.userService.AddFavorite(user_id, id).pipe(takeUntil(this.destroy$)).subscribe( response => {                   
          // console.log(response);
        },
        error => {
          console.log(error);        
        });
  }
 
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
