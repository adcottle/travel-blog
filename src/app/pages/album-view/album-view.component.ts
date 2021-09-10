import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../service/images/images.service';
import { CrudService } from '../../service/crud/crud.service';
import { UserService } from '../../service/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog} from '@angular/material/dialog';
import { ImageModalComponent } from './image-modal/image-modal.component';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit, OnDestroy {

  id:  any;
  user_id:  any;
  albumImage: any = []; 
  Post: any = [];
  Cover: any;
  commentForm: FormGroup;
  submitted = false;
  Favorites: any = [];
  icon: any = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private actRoute: ActivatedRoute, 
    private imageService: ImagesService, 
    private crudService: CrudService,
    private userService: UserService,
    public dialog: MatDialog, public fb: FormBuilder) {
      this.user_id = localStorage.getItem('user');
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
        // var uid = localStorage.getItem('user');
        this.myFavorites(this.user_id, image); 
        image.forEach(element => {  
          const mergedObj = { ...t, ...element };   
          this.albumImage.push(mergedObj);          
          // console.log(this.albumImage);
        });                 
      });    
    });    
  }; 

  myFavorites(uid, imgs) {   
    this.userService.GetMyFavorites(uid).pipe(takeUntil(this.destroy$)).subscribe( res => {
      // console.log(res)      
      var pip = res.favorites;
      const haveIds = new Set(pip.map(({ _id }) => _id));
      var result = imgs.map(({ _id }) => ({ _id, favorite: haveIds.has(_id) }));
      this.Favorites = result;
      // console.log(this.Favorites);
    
    });  
  };
 

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
    Object.keys(this.commentForm.controls).forEach(key =>{
      this.commentForm.controls[key].setErrors(null)
   });
  }

  makeFavorite(id){
        this.userService.AddFavorite(this.user_id, id).pipe(takeUntil(this.destroy$)).subscribe( response => {                   
          // console.log(response);
          this.getMerged(this.id);
        },
        error => {
          console.log(error);        
        });
  }

  removeFavorite(img_id) {
    if (window.confirm('Remove this image from your favorites?')) {
      this.userService.deleteFavorite(this.user_id, img_id).subscribe((data) => {
         console.log(data);
         this.getMerged(this.id);
       
      });
    };
  };
  
 
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
