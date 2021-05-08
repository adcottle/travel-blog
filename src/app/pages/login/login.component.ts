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
        title: 'Navajo Bridge in Marble Canyon'
    }, {
        image: '../../../assets/pics/mesa_arch.jpg',
        thumbImage: '../../../assets/pics/mesa_arch.jpg',
        title: 'Mesa Arch Moab, UT'
    }, {
        image: '../../../assets/pics/cliff.jpg',
        thumbImage:  '../../../assets/pics/cliff.jpg',
        title: "Looking over a 1000(+)' cliff."
    },{
        image: '../../../assets/pics/camelback.jpg',
        thumbImage: '../../../assets/pics/camelback.jpg',
        title: 'Camelback Mountain Phoenix, Az'
    }, {
        image: '../../../assets/pics/red_rocks.jpg',
        thumbImage: '../../../assets/pics/red_rocks.jpg',
        title: 'Red Rocks of Sedona, AZ'
    }, {
        image: '../../../assets/pics/goblin_valley.JPG',
        thumbImage: '../../../assets/pics/goblin_valley.JPG',
        title: 'Goblin Valley, AZ'
    }];

  constructor() { }

  ngOnInit(): void {
  }

}
