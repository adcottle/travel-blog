import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';


export interface tableData {
  id: string;
  year: number;
  state: any;
}


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  Trips:any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetTrips().subscribe(res => {
      console.log(res)
      console.log('hello')
      this.Trips =res;
    });    
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteTrip(id).subscribe((res) => {
        this.Trips.splice(i, 1);
      })
    }
  }

}
