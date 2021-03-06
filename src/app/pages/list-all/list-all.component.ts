import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from 'src/app/service/global.variables';
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
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {


  Table: any = [];
  baseURI: string;

  displayedColumns: string[] = ['title', 'state', 'tags', 'category'];
  dataSource: MatTableDataSource<tableData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crudService: CrudService) {
    this.baseURI = GlobalConstants.baseURI;    
   }

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable() { 
    this.crudService.GetTrips().subscribe(res => {
      this.Table = res      
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

}
