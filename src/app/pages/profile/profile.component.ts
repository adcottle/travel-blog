import { Component, OnInit, OnDestroy } from '@angular/core';
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
  favorites: any =[];
  Thumbnails: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public authService: AuthService, private imageService: ImagesService,
    private actRoute: ActivatedRoute, private userService: UserService,
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
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
      let result = response.favorites.map(({ _id }) => _id)
      // console.log(result)
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
      var f = new Array(imgData);
      // console.log(f);
     
     var fn = f.map(function(item){return {filename: item.filename}; });
     var cap = f.map(function(item){return {caption: item.metadata.caption}; }); 
     
     var favs = [];
      favs = f.map(function(item){return {file: item}; });
    
     this.favorites.push(favs);


     
     console.log(this.favorites);
    //  console.log(cap);
  // let cake =  [...fn, ...cap]; 
  // console.log(cake)
  // this.favorites.push(cake);
  // console.log(this.favorites);

  for (var file of fn) {
    // console.log( file); 
    for (var caption of cap) {
      // console.log(caption);

      
      const merged = {...file, ...caption};

      // console.log(merged); 
     
      var fs = { merged };
      
      // console.log(favorites);


      } }
    
  // for (var data of f) {
  //   // console.log(data);
  //   const file = data.filename;
  //   console.log(file)
  // }

 











      // f.map(el => {
      //   // console.log(element)
      //   var url = 'http://localhost:4000/images/file/';
      //   var f = el.filename;               
      //   uri = new Array('link', url + f);
      //   console.log(uri);
      //   var caption = new Array(el.metadata.caption);
      //   console.log(caption)
        

                
      // });

      
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