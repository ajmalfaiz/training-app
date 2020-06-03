import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/global/customer.service';

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
    private router:Router, private customer:CustomerService) { }

  ngOnInit(): void {
  }
  onAdd(form: NgForm){
   
  
    

    // const  headers = new  HttpHeaders().set('authorization', 'JWT ' + JSON.parse(localStorage.getItem('Getusers')).token);
    this.customer.add_customer(form.value.name ,form.value.address, form.value.donation, form.value.mobile, form.value.sports).subscribe(
      (res: any) => {
        
        form.resetForm();
        this.router.navigateByUrl('/admin');
      
      },
      (err: HttpErrorResponse) => {
        alert('failed');
        
      }
    );
    }
    

}
