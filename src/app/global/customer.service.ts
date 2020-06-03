import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from './customer.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http:HttpClient,
    private customer: Customer) { 
    
  }




  add_customer(name: string,
    address: string,
    donation: number,
    mobile: number,
    sports:string
  ) {
   return this.http.post(`${environment.apiUrl}/products`,{ "name":name,
    "donation":donation,
    "mobile":mobile,
    "sports":sports,
    "address":address
      

    }) .pipe(map(
      (res:any) => {
          
      
      }
  ));
}

}
