import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthserviceService } from 'src/app/authentication/authservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private auth: AuthserviceService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout(){
    this.auth.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
