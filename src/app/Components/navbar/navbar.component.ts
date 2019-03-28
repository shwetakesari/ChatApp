import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../Services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  public logout():void{
    this.auth.logout();
  }

}
