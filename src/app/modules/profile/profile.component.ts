import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_details: any;

  constructor() { }

  ngOnInit(): void {
    this.user_details = JSON.parse(localStorage.getItem('user_details'));
  }

}
