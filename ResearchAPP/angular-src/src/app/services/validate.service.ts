import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  // All text field is fill 
  validateRegister(user){
    if(user.name==undefined || user.name =="" || user.username==undefined  || user.username =="" || user.email==undefined || user.email =="" || user.password==undefined || user.password==""){
      return false ;

    }
    else{
      return true ;
    }
  }

  // Valitate Email
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
