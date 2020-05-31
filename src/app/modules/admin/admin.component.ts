import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  searchKey;
  customers;
  Produts;
  displayedColumns: string[] = ['name','phone', 'address', 'sport', 'donation', 'actions'];
  listData: MatTableDataSource<any>;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {
    this.getData();
   }

  ngOnInit(): void {
  }
  getData() {

    const  headers = new  HttpHeaders().set('x-access-token', '' + JSON.parse(localStorage.getItem('trainin_users')).token);
    this.http.get(`${environment.apiUrl}/auth/products`, {headers}).subscribe(
      (data: any) => {
        this.Produts = data;
      },
      (err: HttpErrorResponse) => {
      
       alert('failed');
      }
    );
   
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  delete(element){
    this.customers.object('/admin/' + element.key).remove();
  }
}
