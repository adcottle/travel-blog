import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imageObject = [{
    image: '../../../assets/pics/navajo_bridge.JPG',
    thumbImage: '../../../assets/pics/navajo_bridge.JPG',
    title: 'Navajo Bridge, Marble Canyon'
}, {
    image: '../../../assets/pics/forest_gump.jpg',
    thumbImage: '../../../assets/pics/forest_gump.jpg',
    title: "I'll go home now",
}, {
    image: '../../../assets/pics/cliff.jpg',
    thumbImage:  '../../../assets/pics/cliff.jpg',
    title: "Looking over a scary cliff"
},{
    image: '../../../assets/pics/camelback.jpg',
    thumbImage: '../../../assets/pics/camelback.jpg',
    title: 'Camelback Mountain Phoenix'
}, {
    image: '../../../assets/pics/red_rocks.jpg',
    thumbImage: '../../../assets/pics/red_rocks.jpg',
    title: 'Red Rocks of Sedona'
}, {
    image: '../../../assets/pics/goblin_valley.JPG',
    thumbImage: '../../../assets/pics/goblin_valley.JPG',
    title: 'Goblin Valley'
}];
  constructor() { }

  ngOnInit(): void {
      
  }

}