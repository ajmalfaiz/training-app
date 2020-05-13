import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  searchKey;
  customers;
  displayedColumns: string[] = ['name','phone', 'address', 'sport', 'donation', 'actions'];
  listData: MatTableDataSource<any>;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public crud: CrudService) {
    this.getData();
   }

  ngOnInit(): void {
  }
  getData() {
    this.crud.GetService().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {
      
      this.customers = customers;
      this.listData = new MatTableDataSource(customers);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
