import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../service/token.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }
logOut(){
  // console.log('goi log out');
  //   this.tokenService.logOut();
  console.log('goi log out');
  window.sessionStorage.clear();
  window.location.reload()
}
}
