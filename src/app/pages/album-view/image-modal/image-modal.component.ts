import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { GlobalConstants } from 'src/app/service/global.variables';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  imageData: any = [];
  filename: any;
  serverURI: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if(data){        
      this.imageData = data || this.imageData;
      this.serverURI = GlobalConstants.serverURI;
      } 
   }

  ngOnInit(): void {
    this.filename = this.imageData.imageData.filename
  }

}
