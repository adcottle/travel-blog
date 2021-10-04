import { Component, OnInit, OnDestroy } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { GlobalConstants } from 'src/app/service/global.variables';
import { Router } from '@angular/router';
import { ImagesService } from '../../service/images/images.service';
import { CrudService } from '../../service/crud/crud.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  serverURI: string;
  Metadata: any = [];
  Images: any = [];
  tripDate: any = [];
  Trips: any = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

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
    title: 'Mesa Arch Moab, UT'
}, {
    image: '../../../assets/pics/cliff.jpg',
    thumbImage:  '../../../assets/pics/cliff.jpg',
    title: "Looking over a scary cliff."
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

constructor(private imageService: ImagesService, private crudService: CrudService, public router: Router) { 
  this.serverURI = GlobalConstants.serverURI;
  this.dataSource.data = TREE_DATA;
}
hasChild = (_: number, node: ExampleFlatNode) => node.expandable;



ngOnInit(): void {
  // this.circleText();
  this.getMerged();
}


getMerged(){
  let trip;
  var image: any = [];
  this.crudService.GetLatest().pipe(takeUntil(this.destroy$)).subscribe( (tripData: any =[]) => {   
    trip = tripData;
    // console.log(trip);
    this.imageService.GetLatest().pipe(takeUntil(this.destroy$)).subscribe( (imageData: any =[]) => {      
      // console.log(imageData)
      image = imageData;
      // console.log(image);
      this.Metadata = this.mergeArrayObjects(trip,image);
    });
  });    
};

mergeArrayObjects(arr1,arr2){
  return arr1.map((item,i)=>{
     if(item._id === arr2[i].metadata.album_id){
         //merging two objects
       return Object.assign({},item,arr2[i])
     };
  });
};

openAlbum(id) {
  // console.log(id);
  this.router.navigate(['album-view/' + id]);
}

ngOnDestroy() {
  this.destroy$.next(true);
  // Unsubscribe from the subject
  this.destroy$.unsubscribe();
}

}
