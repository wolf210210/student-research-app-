import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';

import 'rxjs/add/operator/map';

import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken :any;
  user :any;


  constructor(private http:Http) { }

  registerUser(user){ 
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
    .map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
    .map(res=>res.json());
  }

     /* pass token to backend(users/profile/) then get user details */
     getProfile(){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-type','application/json');
      return this.http.get('http://localhost:3000/users/profile',{headers:headers})
      .map(res=>res.json());
    }


      /* pass updated values to backend(/users/updateprofile/)  */
  updateProfile(updateUser){ 
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.put('http://localhost:3000/users/Updateprofile',updateUser,{headers:headers})
    .map(res=>res.json());
  }


  addVideo(video){ 
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/videos/add',video,{headers:headers})
    .map(res=>res.json());
  }

  getVideostByuserName(video){ 
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/videos/getVideostByuserId',video,{headers:headers})
    .map(res=>res.json());
  }

  GetAllVideos(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:3000/videos/getAllVideo',{headers:headers})
    .map(res=>res.json());
  }

  
  getVideostById(video){ 
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/videos/getProjectId',video,{headers:headers})
    .map(res=>res.json());
  }

   
  getCommentstById(comment){ 
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/comments/getCommentByVId',comment,{headers:headers})
    .map(res=>res.json());
  }


  addComments(comment){ 
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:3000/comments/setComment',comment,{headers:headers})
    .map(res=>res.json());
  }
  
 


  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
   console.log(user);
    this.authToken = token;
    this.user = user ;
  }

  /* Retrive token which is previously stored */
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token ;
  }

/* Return token */
  loggedIn(){
    return tokenNotExpired('id_token');
  
  }

  logout(){
    this.authToken= null;
    this.user= null ; 
    localStorage.clear();
  }

}
