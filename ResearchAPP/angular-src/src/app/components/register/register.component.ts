import { Component, OnInit } from '@angular/core';

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name :String;
  Username:String ; 
  email : String ; 
  password :String ;;
  occupation : string;  


  private showError : boolean = false ; 
  private successMsg : boolean = false ;
  private emailError : boolean = false;
  private PasswordError : boolean = false ;
  private ConfirmPasswordError : boolean = false ;
  private UserNameError : boolean  = false ; 
  private  errorName : boolean = false ;
  private OccupationError : boolean = false;
  ErroMsg  : string ; 
 


  constructor(
              private validateService : ValidateService, 
               private authService : AuthService,
               private router :Router 
   ) { }

  ngOnInit() {
  }

  // Register Submitbutton clicked
  onRegisterSubmit(){
    
    //console.log(this.name);
    const user ={
      name :this.name ,
      email : this.email , 
      username :this.Username,
      password : this.password,
      occupation : this.occupation
    } 

  //  check Fill all text field
  if(!this.validateService.validateRegister(user)){
    console.log('please fill in all fields'); 

    this.ErroMsg = "please fill in all fields" ;
    this.showError = true ;
    this.emailError = true ;
    this.errorName = true;
    this.UserNameError =  true; 
    this.PasswordError = true ;
    this.ConfirmPasswordError =  true;
    this.OccupationError = true;
    setTimeout (() => {
      this.showError = false ;
      this.emailError = false ;
      this.errorName = false;
      this.UserNameError =  false ; 
      this.PasswordError = false ;
      this.ConfirmPasswordError =  false ;
      this.OccupationError= false;
    }, 3000)
    return false;
  }

    //  check correct email
    if(!this.validateService.validateEmail(user.email)){
   
      this.ErroMsg = "please enter a valid email" ;
      this.showError = true ;
      this.emailError = true ;
      setTimeout (() => {
        this.showError = false ;
        this.emailError = false ;
      }, 3000)
      return false;
    }


    var letterNumber = /^[a-zA-Z]+$/;
    if(!this.name.match(letterNumber) ){
      this.ErroMsg = "Only characters can enter for a name"
      this.errorName= true ; 
       this.showError = true ;      
          
            setTimeout (() => {
               this.showError = false ; 
               this.errorName= false ; 
             }, 3000)
       return false ;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        console.log('User Add');
        this.router.navigate(['/login']);
      }
      else{ 
        console.log('User con not Add');
        this.router.navigate(['/register']);
      }
    });



  }

}
