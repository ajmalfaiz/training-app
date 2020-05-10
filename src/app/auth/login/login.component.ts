import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authentication/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private auth: AuthserviceService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.auth.login(this.username, this.password)
          .subscribe(
            data => {
              alert('success')
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
