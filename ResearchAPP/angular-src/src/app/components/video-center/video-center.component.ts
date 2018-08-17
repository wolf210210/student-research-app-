import { Component, OnInit } from '@angular/core';
import { Video } from '../../video';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  constructor(
    private authService : AuthService
  ) { }

  private newVideo : boolean = false;
  user:Object;

  // videos : Video[] = [
  //   {"title" :"title1","lectureName" :"lectureName","unit" :"unit","subject" :"subject","description" :"description","url" :"https://www.youtube.com/watch?v=C5b1ezNRW2Y","neg" : "neg","pos":"pos","ratings":"5"},
  //   {"title" :"title2","lectureName" :"lectureName","unit" :"unit","subject" :"subject","description" :"description","url" :"https://www.youtube.com/embed/8LxOC89qkHM?ecver=1","neg" : "neg","pos":"pos","ratings":"5"},
  //   {"title" :"title3","lectureName" :"lectureName","unit" :"unit","subject" :"subject","description" :"description","url" :"https://www.youtube.com/watch?v=COEd4_9mhLw","neg" : "neg","pos":"pos","ratings":"5"},
  //   {"title" :"title4","lectureName" :"lectureName","unit" :"unit","subject" :"subject","description" :"description","url" :"https://www.youtube.com/watch?v=C5b1ezNRW2Y","neg" : "neg","pos":"pos","ratings":"5"},
  //   {"title" :"title5","lectureName" :"lectureName","unit" :"unit","subject" :"subject","description" :"description","url" :"https://www.youtube.com/watch?v=C5b1ezNRW2Y","neg" : "neg","pos":"pos","ratings":"5"}
    
  // ];
   videos : Video[] = [];
  selectedVideo : Video ; 
  private Title : string ; 
  private lechureName  : string ; 
  private subject : string ; 
  private unit : string ; 
  private url : string ; 
  private description : string ; 



  ngOnInit() {
       

         const lectureName = {
                           lectureName : JSON.parse(localStorage.getItem('user')).username
                }
        this.authService.getVideostByuserName(lectureName).subscribe(res=>{
        console.log(res);
          this.videos =res ;
    });
  }

  onSelectVideo(video : any){
    this.selectedVideo =  video ; 
    console.log(this.selectedVideo);

  }

  onNewVideo(a : any ){
    this.newVideo = true;
  }
  addSubmit(){
    // const tempNewVideo = {
    //           title: this.Title, 
    //           lectureName:this.lechureName,
    //           unit :this.unit, 
    //           subject:this.subject,
    //           description:this.descripation, 
    //           url:this.url,
    //           neg : "neg",
    //           pos: "pos",
    //           ratings : "5"
              
    // }; 



    const tempNewVideo =      {
              title: this.Title, 
                lectureName:JSON.parse(localStorage.getItem('user')).username,
                unit :this.unit , 
                subject:this.subject,
                description:this.description, 
                url:this.url,
                neg : "neg",
                pos : "pos",
                ratings : "5"
            
          }

           console.log(tempNewVideo);
            this.authService.addVideo(tempNewVideo).subscribe(res=>{
            console.log(res)
            this.videos.push(res.Video);

          });
     
  }
  
}
