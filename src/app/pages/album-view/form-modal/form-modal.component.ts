import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { GlobalConstants } from 'src/app/service/global.variables';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImagesService } from '../../../service/images/images.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  imageData: any = [];
  imgTitle: string;
  serverURI: string;
  user_id: string;
  commentForm: FormGroup;
  submitted = false;
  imgComms: any = [];
  city: string;
  state: string;
  imgDate: string;
  imgDesc: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
  public fb: FormBuilder,
  private imageService: ImagesService) {
    if(data){   
      // console.log(data)     
      this.imageData = data || this.imageData;
      this.serverURI = GlobalConstants.serverURI;
      } 
      this.user_id = localStorage.getItem('uid');
      }

  ngOnInit(): void {
    this.SetAttributes(); 
    this.GetImageComments(this.imageData.imageData._id);
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
      user: []
    });
  }
  get f() { return this.commentForm.controls;      
  }

  SetAttributes(){
    this.imgTitle = this.imageData.imageData.metadata.caption;
    this.city = this.imageData.imageData.metadata.city;
    this.state = this.imageData.imageData.metadata.state;
    this.imgDate = this.imageData.imageData.metadata.photo_date;
    this.imgDesc = this.imageData.imageData.metadata.description;    
  }

  GetImageComments(id) {
    this.imageService.GetAlbumComments(id).pipe(takeUntil(this.destroy$))
      .subscribe(com => {
        if (com) { this.imgComms = com; }
      });
  };
 

  addComment() {    
    var id = this.imageData.imageData._id;
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    } else {
      this.commentForm.get('user').setValue(localStorage.getItem('uid'));
      // console.log(this.commentForm.value);
      this.imageService.AddComment(id, this.commentForm.value)
      this.commentForm.reset();
      Object.keys(this.commentForm.controls).forEach(key => {
        this.commentForm.controls[key].setErrors(null)
      });
      this.GetImageComments(id);
    }
  };

  deleteComment(img_id, c_id) {
    if (window.confirm('Delete your comment?')) {
      this.imageService.deleteComment(img_id, c_id).pipe(takeUntil(this.destroy$)).subscribe((response) => {
        // console.log(response);         
        this.GetImageComments(img_id);
      });
    };
  };


  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}

