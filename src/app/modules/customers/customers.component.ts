import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/global/customer.service';
import { Customer } from 'src/app/global/customer.model';
import { MsgService } from 'src/app/global/msg.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers=[];
  donation;
  name;
  mobile;
  address;
  sports;

  constructor( private _snackBar: MatSnackBar,private http: HttpClient,
    private router:Router, private customer:CustomerService,
    private message_service: MsgService) { }

  ngOnInit(): void {
  }
  onAdd(form: NgForm){
   var value: Customer;
   value = form.value;
  
    

    // const  headers = new  HttpHeaders().set('authorization', 'JWT ' + JSON.parse(localStorage.getItem('Getusers')).token);
    this.customer.add_customer(value).subscribe(
      (res: any) => {
        
        form.resetForm();
        this.message_service.showSuccessMessage('customer added','');
        this.router.navigateByUrl('/admin');
      
      },
      (err: HttpErrorResponse) => {
        this.message_service.showErrorMessage('internal server error','');
      }
    );
    }
    

}
