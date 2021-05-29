import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Countries',
    children: [
      {name: 'US Virgin Islands'},
      {name: 'Bahamas'},
      {name: 'British Virgin Islands'},
    ]
  }, {
    name: 'States',
    children: [
      {
        name: 'Tennessee',
        children: [
          {name: 'Chattanooga'},
          {name: 'Gatlinburg'},
          {name: 'Nashbille'},
        ]
      }, {
        name: 'Texas',
        children: [
          {name: 'Austin'},
          {name: 'San Antonio'},
        ]
      },{
        name: 'West Viginia',
        children: [
          {name: 'Elkins'},
          {name: 'WV Games'},
        ]
      },{
        name: 'Utah',
        children: [
          {name: 'Hot Pots'},
          {name: 'Salt Lake'},
          {name: 'Provo'},
          {name: 'Belly of the Dragon'},
        ]
      },
      
    ]
  },{
    name: 'Marching Band',
    children: [
      {name: 'Battle of the Bands'},
      {name: 'Disney'},
      {name: 'Parades'},
    ]
  },{
    name: 'National Parks',
    children: [
      {name: 'Grand Canyon'},
      {name: 'Zion'},
      {name: 'Cloud Canyon'},
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

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
  constructor() {
    this.dataSource.data = TREE_DATA;
   }
   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  ngOnInit(): void {
      
  }

}