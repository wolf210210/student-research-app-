import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


    user: any; 
    name : string ; 
    email:string ;
    occupation :string ;
    username :string ;

    private showText :boolean = false;

  constructor(
              private authService:AuthService
               ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile=>{
      // Get user object 
      this.user  =profile.user; 
      this.name  = profile.user.name ; 
      this.email  = profile.user.email ; 
      this.occupation  = profile.user.occupation ; 
      this.username =profile.user.username; 
      console.log(this.user);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  editUpdate(){
           this.showText = true ;
      
  }

  onUpadte(){
           const tempUser =  {
              _id :this.user._id,
              name:this.name,
              email: this.email,
              occupation : this.occupation
          }

        console.log(tempUser);
        
        this.authService.updateProfile(tempUser).subscribe(res=>{  
          this.user = res;
          this.name  = res.name ; 
          this.email  = res.email ; 
          this.occupation  = res.occupation ; 
          this.showText = false ;
          document.getElementById("openModalButton").click();
        });
  }

}
