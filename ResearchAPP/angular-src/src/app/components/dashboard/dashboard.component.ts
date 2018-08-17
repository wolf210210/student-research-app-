import { Component, OnInit } from '@angular/core';
import { Video } from '../../video';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router:Router
  ) { }

  private showEdit : boolean = false;
  videos : Video[] = [];

  ngOnInit() {
          //     const lectureName = {
          //       lectureName : JSON.parse(localStorage.getItem('user')).username
          // }
          // this.authService.GetAllVideos(lectureName).subscribe(res=>{
          // console.log(res);
          // this.videos =res ;
          // });



          this.authService.GetAllVideos().subscribe(res=>{
      
            this.videos =res.Videos ;
            
          });
  }

  setStorege( v : any ){

    localStorage.setItem('selectVideo',JSON.stringify(v));
    this.router.navigate(['/DashboardDetails']);
  }


}
