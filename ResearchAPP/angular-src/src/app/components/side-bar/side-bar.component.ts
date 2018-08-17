import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  private HideAccount : boolean =  false ; 
  private HideUpload : boolean =  false ; 

  constructor(private router:Router ,
              private authService:AuthService 
            ) { }

  ngOnInit() {
  }

  onLogin(){
    this.router.navigate(['/login']);
  }
  onRegister(){
    this.router.navigate(['/register']);
  }
  onAccount(){
    this.HideAccount = true ; 
  }
  onProfile(){
    this.router.navigate(['/profile']);
  }
  onDashboard(){
    this.router.navigate(['/dashboard']);
  }
  onLogOut(){
    this.authService. logout();
  }
  onUpload(){
    this.HideUpload =  true ; 

  }
  onVideos(){
    this.router.navigate(['/video']);
  }


}
