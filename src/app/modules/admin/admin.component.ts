import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MsgService } from 'src/app/global/msg.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { CustomerService } from 'src/app/global/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  searchKey;
  customers;
  mandoForm: FormGroup;
  displayedColumns: string[] = ['name','mobile', 'address', 'sports', 'donation', 'actions'];
  Produts: MatTableDataSource<any>;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  id: any;

  constructor(private http: HttpClient, private message_service: MsgService, private _formBuilder:FormBuilder,
    private customer_service: CustomerService, private router: Router) {
    this.getData();
   }

  ngOnInit(): void {
    this.mandoForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      mobile: [''],
      sports: [''],
      donation: [''],
      address: ['']
    });

  }
  getData() {

   //  const  headers = new  HttpHeaders().set('x-access-token', '' + JSON.parse(localStorage.getItem('trainin_users')).token);
    this.http.get(`${environment.apiUrl}/products`, {}).subscribe(
      (data: any) => {

        this.customers = data;
        this.Produts = new MatTableDataSource(data);
        this.Produts.sort = this.sort;
        this.Produts.paginator = this.paginator;
       
        
      },
      (err: HttpErrorResponse) => {
      
       this.message_service.showErrorMessage('Internal server error','');
      }
    );
   
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.Produts.filter = this.searchKey.trim().toLowerCase();
  }
  delete(element){
    this.customers.object('/admin/' + element.key).remove();
  }
  onFormSubmit(){

    this.customer_service.edit_customer(this.id,this.mandoForm.value).subscribe(
      (res: any) => {
        
        this.message_service.showSuccessMessage('Product  updated','');
      
      },
      (err: HttpErrorResponse) => {
        this.message_service.showErrorMessage('internal server error','');
      }
    );

  }


  // setting values to form 
  edit(element){
    this.id = element._id;
   this.mandoForm.setValue({
    name: element.name,
    mobile: element.mobile,
    donation: element.donation,
    sports: element.sports,
    address: element.address

   })
  }
}
