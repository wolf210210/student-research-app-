import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService , private router:Router) { }

  ngOnInit() {
  }
  
  onLogoutClick(){

    this.authService.logout();
    console.log("logout success");
    this.router.navigate(['/login']);
  }
  onLogin(){
    this.router.navigate(['/login']);
  }
  onRegister(){
    this.router.navigate(['/register']);
  }
  onProfile(){
    this.router.navigate(['/profile']);
  }
  onDashboard(){
    this.router.navigate(['/dashboard']);
  }
  OnLogOut(){
    this.authService. logout();
  }

}
