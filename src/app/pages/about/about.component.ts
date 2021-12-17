import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../service/crud/crud.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface tableData {
  _id: string;
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
  Table:any = [];

  displayedColumns: string[] = ['id', 'state', 'year']; 
  dataSource: MatTableDataSource<tableData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.populateTable();
    this.crudService.GetTrips().subscribe(res => {
      /*console.log(res)*/
      this.Trips =res;
    });    
    
  }



  populateTable() { 
    this.crudService.GetTrips().subscribe(res => {
      this.Table = res
      console.log(this.Table)
      this.dataSource = new MatTableDataSource(this.Table);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;                 
    }, err => {
      console.log(err);
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
