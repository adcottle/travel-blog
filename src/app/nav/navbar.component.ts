import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../service/global.variables';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user_id: any;
  baseURI: string;

  constructor() { 
    this.user_id = localStorage.getItem('uid'); 
    this.baseURI = GlobalConstants.baseURI;
  }

  ngOnInit(): void {
    
  }

}
