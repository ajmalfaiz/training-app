import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    private router:Router) { }

  ngOnInit(): void {
  }
  onAdd(form: NgForm){
    let value = {}
    value = form.value;
    const datas= JSON.stringify(value);

    // const  headers = new  HttpHeaders().set('authorization', 'JWT ' + JSON.parse(localStorage.getItem('Getusers')).token);
    this.http.post(`${environment.apiUrl}/products`,{ "name":this.name,
    "donation":this.donation,
    "mobile":this.mobile,
    "sports":this.sports,
    "address":this.address
      

    }).subscribe(
      (data: any) => {
        alert('sucesss');
        form.resetForm();
        this.router.navigateByUrl('/admin');
       
       
      },
      (err: HttpErrorResponse) => {
        alert('failed');
        
      }
    );
    }
    

}
