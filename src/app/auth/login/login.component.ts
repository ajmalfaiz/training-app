import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authentication/authservice.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;


  loginMode=true;
  isLoading=false;
  error: string = null;

  constructor(private auth: AuthserviceService,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }
  
  switchMode(){
    this.loginMode =! this.loginMode;
  }

  onSubmit(form: NgForm){
    

    if (!form.valid){
      return;
    } else {


      if(this.loginMode){


      this.auth.login(form.value.email, form.value.password)
      .subscribe(
        data => {
          alert('success');
          this.router.navigate(['/admin']);
          // this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          alert('failed')
         // this.myform.reset(this.phone);
         // this.myform.reset(this.password);
         
        });
    }else {
      this.auth.signup(form.value.name,form.value.email, form.value.password)
      .subscribe(
        data => {
          alert('success');
          this.router.navigate(['/admin']);
          // this.router.navigateByUrl(this.returnUrl);
        },
        error => {
          alert('failed')
         // this.myform.reset(this.phone);
         // this.myform.reset(this.password);
         
        });
      
      



    }

    }

  }
   

    
}
