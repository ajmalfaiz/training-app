import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
import { from } from 'rxjs';
import {CustomerStore} from 'src/app/global/customer-store';
declare const $: any;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  CustomerStore = CustomerStore;
  searchKey;
  mandoForm: FormGroup;
  Produts: MatTableDataSource<any>;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  id: any;
  page=1;
  constructor(private http: HttpClient, private message_service: MsgService, private _formBuilder:FormBuilder,
    private customer_service: CustomerService, private router: Router,
    private _cdr: ChangeDetectorRef
    ) {
   
   }

  ngOnInit(): void {
    this.mandoForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      mobile: [''],
      sports: [''],
      donation: [''],
      address: ['']
    });
   
    // getting product list
    this.customer_service.get_customer().subscribe();
  }
  
  
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    this.Produts.filter = this.searchKey.trim().toLowerCase();
  }
  delete(element){
    
  }
  onFormSubmit(){

    this.customer_service.edit_customer(this.id,this.mandoForm.value).subscribe(
      (res: any) => {
        this.message_service.showSuccessMessage('Product  updated','');
        this.message_service.detectChanges(this._cdr);
        $(".close").click();

      
      },
      (err: HttpErrorResponse) => {
        this.message_service.showErrorMessage('internal server error','');
      }
    );

  }


  // setting values to form 
  edit(cust){
    this.id = cust._id;
   this.mandoForm.setValue({
    name: cust.name,
    mobile: cust.mobile,
    donation: cust.donation,
    sports: cust.sports,
    address: cust.address

   })
  }
}
