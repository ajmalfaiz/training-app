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

  constructor(private http:HttpClient) { 
    
  }




  add_customer(customer:Customer
  ) {
   return this.http.post(`${environment.apiUrl}/products`,{ "name":customer.name,
    "donation":customer.donation,
    "mobile":customer.mobile,
    "sports":customer.sports,
    "address":customer.address
      

    }) .pipe(map(
      (res:any) => {
          
      return res;
      }
  ));
}
 edit_customer(id, customer:Customer){
  return this.http.patch(`${environment.apiUrl}/products/` +id,{ "name":customer.name,
  "donation":customer.donation,
  "mobile":customer.mobile,
  "sports":customer.sports,
  "address":customer.address
    

  }) .pipe(map(
    (res:any) => {
    
      return res;
    
    }
));



 }

}
