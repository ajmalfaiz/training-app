import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers=[];

  constructor(public crud: CrudService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onAdd(form: NgForm){
    let value = {}
    value = form.value;
    this.crud.AddService(value).then(res => {
        this._snackBar.open('Form Submitted', 'Done', {
          duration: 2000,
        });
        form.reset();
    }).catch(error => {
      this._snackBar.open('An Unknown Error Occured', 'Done', {
        duration: 2000
      });
    })
  }

 
 
}
