import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from './authentication/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'nature';
  constructor(private auth: AuthserviceService) {}
  ngOnInit() {
    console.log('autologin checked');
  }
}
