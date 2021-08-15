import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth/auth.service';
import { UserService } from '../../service/user/user.service';
import { ImagesService } from '../../service/images/images.service';
import { takeUntil } from 'rxjs/operators';
import {  Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any =[];
  userID: any;
  thumbnailName: any =[];
  thumbnailCaption: any =[]; 

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public authService: AuthService, private imageService: ImagesService,
    private actRoute: ActivatedRoute, private userService: UserService,
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.userID = id;
    this.authService.getUserProfile(id).subscribe((res:any) => {      
      this.currentUser = res.msg;
      // console.log(res);
    })
  }

  ngOnInit() {
    this.myFavorites();
   }

  myFavorites() {
    var user_id = localStorage.getItem('user');
    this.userService.GetMyFavorites(user_id).pipe(takeUntil(this.destroy$)).subscribe(response => {    
      // console.log(response.favorites);
      let result = response.favorites.map(({ _id }) => _id);
      // console.log(result);      
      result.forEach(element => {
        this.displayFavorites(element);
      });
    },
      error => {
        console.log(error);
      });
  };
 
  displayFavorites(id){
    this.imageService.GetFavorite(id).pipe(takeUntil(this.destroy$)).subscribe( imgData => {     
      // console.log(imgData);
     var f = new Array(imgData.filename);
      this.thumbnailName.push(f);
      var c = new Array(imgData.metadata.caption);
      this.thumbnailCaption.push(c);     
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