import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user_id: any;

  constructor() { this.user_id = localStorage.getItem('user'); }

  ngOnInit(): void {
    
  }

}
