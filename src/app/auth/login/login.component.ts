import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authentication/authservice.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MsgService } from 'src/app/global/msg.service';

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
    private _snackBar: MatSnackBar, private router: Router,
    private message_service : MsgService
    ) { }

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
         this.message_service.showSuccessMessage('logged in','');
          this.router.navigate(['/admin']);
        },
        error => {
         this.message_service.showErrorMessage('internal server error','');
       
         
        });
    }else {
      this.auth.signup(form.value.name,form.value.email, form.value.password)
      .subscribe(
        data => {
          this.message_service.showSuccessMessage('sign up successfully','');
          this.router.navigate(['/admin']);
         
        },
        error => {
          this.message_service.showErrorMessage('internal server error','');
         
         
        });
      
      



    }

    }

  }
   

    
}
