import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Video } from '../../video';
import { Comments } from '../../comments';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
export class DashboardDetailComponent implements OnInit {

  constructor(
    private authService : AuthService
  ) { }
  Video:Video[];
  Comment :Comments[];
  url:String;
  title:String;
  textComment : string ; 
  

  ngOnInit() {

    this.url = JSON.parse(localStorage.getItem('selectVideo')).url
    this.title = JSON.parse(localStorage.getItem('selectVideo')).title
      console.log(JSON.parse(localStorage.getItem('selectVideo')))
    
      let tempVideo =  { 
                      VID  :JSON.parse(localStorage.getItem('selectVideo'))._id
      }

    this.authService.getCommentstById(tempVideo).subscribe(res=>{
       this.Comment =res ;
     
    });
  }

  addComment(){
    // console.log(this.textComment)
    let tempComment = {
      Vname: JSON.parse(localStorage.getItem('selectVideo')).title,
      VID:JSON.parse(localStorage.getItem('selectVideo'))._id,
      username : JSON.parse(localStorage.getItem('user')).username,  
      comment :this.textComment,
      CType:"CType" 
    }

    console.log(tempComment);

    this.authService.addComments(tempComment).subscribe(res=>{
 
      this.Comment.push(res.comments);
    
   });
  }

}
