import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../service/images/images.service';
import { CrudService } from '../../service/crud/crud.service';
import { UserService } from '../../service/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit, OnDestroy {

  id: any;
  user_id: any = [];
  albumImage: any = [];
  imageData: any = [];
  Post: any = [];
  Cover: any;
  commentForm: FormGroup;
  submitted = false;
  Favorites: any = [];
  Comments: any = [];
<<<<<<< HEAD

=======
 
>>>>>>> 7eef99126f733e147e3922803569be3ddea5a932

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private actRoute: ActivatedRoute,
    private imageService: ImagesService,
    private crudService: CrudService,
    private userService: UserService,
    public dialog: MatDialog, public fb: FormBuilder) {
    this.user_id = localStorage.getItem('user');
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
      user: []
    })

  }
  get f() { return this.commentForm.controls; }

  ngOnInit() {
    this.getMerged(this.id);
    this.getCover(this.id);
  }

  getMerged(id) {
    this.crudService.GetTrip(id).pipe(takeUntil(this.destroy$)).subscribe((tripData: any = []) => {
      this.Post = tripData;
      this.imageService.GetAlbum(id).pipe(takeUntil(this.destroy$)).subscribe((imageData: any = []) => {
        var t = [tripData];
        this.imageData = imageData;
        this.myFavorites(this.user_id, this.imageData);
        this.imageData.forEach(element => {
          const mergedObj = { ...t, ...element };
          this.albumImage.push(mergedObj);
          this.GetImageComments(id);
        });
      });
    });
  };

  myFavorites(uid, imgs) {
    this.userService.GetMyFavorites(uid).pipe(takeUntil(this.destroy$)).subscribe(res => {
      // console.log(res)      
      var my_favs = res.favorites;
      const haveIds = new Set(my_favs.map(({ _id }) => _id));
      var result = imgs.map(({ _id }) => ({ _id, favorite: haveIds.has(_id) }));
      this.Favorites = result;
    });
  };

  makeFavorite(id) {
    this.userService.AddFavorite(this.user_id, id).pipe(takeUntil(this.destroy$)).subscribe(response => {
      var my_favs = response.favorites;
      const haveIds = new Set(my_favs.map(({ _id }) => _id));
      var y = this.Favorites.map(({ _id }) => ({ _id, favorite: haveIds.has(_id) }));
      this.Favorites = y;
    },
      error => {
        console.log(error);
      });
  }

  removeFavorite(img_id) {
    if (window.confirm('Remove this image from your favorites?')) {
      this.userService.deleteFavorite(this.user_id, img_id).pipe(takeUntil(this.destroy$)).subscribe((response) => {
        //  console.log(response);     
        var my_favs = response.favorites;
        const haveIds = new Set(my_favs.map(({ _id }) => _id));
        var y = this.Favorites.map(({ _id }) => ({ _id, favorite: haveIds.has(_id) }));
        this.Favorites = y;
      });
    };
  };


  getCover(id) {
    this.imageService.GetCover(id).pipe(takeUntil(this.destroy$)).subscribe(coverImage => {
      var ci = coverImage
      var uri = 'http://localhost:4000/images/file/'
      var CIuri = ci[0].filename;
      this.Cover = uri + CIuri;
    });
  };


  openModal(filename) {
    this.imageService.OpenImage(filename).pipe(takeUntil(this.destroy$)).subscribe(img => {
      this.dialog.open(ImageModalComponent, {
        height: '100%',
        width: 'auto',
        data: {
          imageData: img
        }
      });
    });
  };

  GetImageComments(album_id) {
    this.imageService.GetAlbumComments(album_id).pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.Comments = res;
<<<<<<< HEAD
        
        //  cx.map(t1 => ({...t1, ...this.albumImage.find(t2 => t2._id === t1._id)})); 
        var vpid = [];
        var result = this.Comments.forEach(el => {
          var x = el.comments.forEach(itm => {
            vpid.push(itm.user);
          });
        });
        var fpid = vpid.filter(function (item, pos) {
          return vpid.indexOf(item) == pos;
        });       
        this.Comments = this.getUserProfiles(fpid, res);
        console.log(this.Comments)
        //console.log(uid)  
        //this.testProfile(res);
      });
  };


  getUserProfiles(profile_id, cxdata) {
    //console.log(profile_id);
    // console.log(cxdata);
    let ident = [];
    profile_id.forEach(pid => {
      this.userService.getUserProfile(pid).pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          var resArr = []
          resArr.push(res)//user name response
          //console.log(resArr);
            cxdata.forEach(item => {
              var cx = [item.comments];
              cx.forEach(el => {
                // console.log(el);
                const a3 = el.map(t1 => ({...t1, ...resArr.find(t2 => t2._id === t1.user)}));
                ident.push(a3)
              })
            });
        });
    });
    return ident;
  };

=======
        //  cx.map(t1 => ({...t1, ...this.albumImage.find(t2 => t2._id === t1._id)}));      
      });
  }; 
>>>>>>> 7eef99126f733e147e3922803569be3ddea5a932

  addComment(id) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }
    this.commentForm.get('user').setValue(localStorage.getItem('user'));
    // console.log(this.commentForm.value);
    this.imageService.AddComment(id, this.commentForm.value)
    this.commentForm.reset();
    Object.keys(this.commentForm.controls).forEach(key => {
      this.commentForm.controls[key].setErrors(null)
    });
    this.GetImageComments(this.id);
  };

  deleteComment(img_id, c_id, alb_id) {
    if (window.confirm('Delete your comment?')) {
      this.imageService.deleteComment(img_id, c_id).pipe(takeUntil(this.destroy$)).subscribe((response) => {
        // console.log(response);         
        this.GetImageComments(alb_id);
        // this.Comments = response.comment        
      });
    };
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
