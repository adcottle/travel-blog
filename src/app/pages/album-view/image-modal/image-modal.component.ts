import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  imageData: any = [];
  filename: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if(data){        
      this.imageData = data || this.imageData;
      } 
   }

  ngOnInit(): void {
    this.filename = this.imageData.imageData.filename
  }

}
