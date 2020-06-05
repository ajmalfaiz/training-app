import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthserviceService } from 'src/app/authentication/authservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
current_user;
  isAuthenticated = false;
  private userSub: Subscription;
  user_details: any;
  constructor(private auth: AuthserviceService,private router: Router) { }

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('user_details'));
    
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');

   
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  
}
