import { Component, OnInit } from '@angular/core';
import { AuthserviceService, AuthResponseData } from 'src/app/authentication/authservice.service';
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
  username: string;
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
    }
    let authObs: Observable<AuthResponseData>;

    const email = form.value.email;
    const password = form.value.password;



    this.isLoading = true;
    if(this.loginMode){
      authObs = this.auth.login(email, password)
    }else {
      authObs = this.auth.signUp(email, password)
    }
    authObs.subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/admin']);
      
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
      this._snackBar.open(this.error, 'Done', {
        duration: 2000,
      });
    });


    
    form.reset();






    // Web Api
  //   this.auth.login(this.username, this.password)
  //         .subscribe(
  //           data => {
  //             alert('success')
  //             this.router.navigate(['/admin']);
  //             // this.router.navigateByUrl(this.returnUrl);
  //           },
  //           error => {
  //             alert('failed')
  //            // this.myform.reset(this.phone);
  //            // this.myform.reset(this.password);
             
  //           });
          
        

  }
}
