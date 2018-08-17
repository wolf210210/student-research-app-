import { Component, OnInit,EventEmitter } from '@angular/core';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs : ['videos'],
  outputs:['SelectVideo','newVideo']
})
export class VideoListComponent implements OnInit {

  public SelectVideo = new EventEmitter() ; 
  public newVideo = new EventEmitter() ; 
   public addNewVideo: boolean = true ;   
  constructor() { }

  ngOnInit() {
  }
  onSelect(vid : any ){
    
    this.SelectVideo.emit(vid);
  }
  onNew(){
    this.newVideo.emit(this.addNewVideo);
  // console.log(this.addNewVideo);
  }

}
