import { Component, OnInit } from '@angular/core';

export interface Tile {
  
  cols: number;
  rows: number;
  text: string;
  image?: string;
}

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {


  Tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 2, image: '../../../assets/pics/mesa_arch.jpg'},
    {text: 'Two', cols: 1, rows: 2, image: '../../../assets/pics/petrified_forest.jpg'},
    {text: 'Three', cols: 2, rows: 2, image: '../../../assets/pics/red_rocks.jpg'},
    {text: 'Four', cols: 2, rows: 2, image: '../../../assets/pics/navajo_bridge.JPG'},
  ];

  constructor() { }

  ngOnInit(): void {
      
  }

}
