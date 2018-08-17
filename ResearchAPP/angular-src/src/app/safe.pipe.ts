// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'safe'
// })
// export class SafePipe implements PipeTransform {

//   transform(value: any, args?: any): any {
//     return null;
//   }

// }

// import {Pipe ,PipeTransform} from '@angular/core' ;
// import {DomSanitizer} from "@angular/platform-browser" ;

// @Pipe({name : 'safe'})
// export class SafePipe implements PipeTransform{
//   constructor(private sanitizer:DomSanitizer){}
//   transform(url : any){
//     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   }
// }

import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {

constructor(private sanitizer: DomSanitizer) {

}

transform(value: any, url: any): any {
    if (value && !url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        let match = value.match(regExp);
        if (match && match[2].length == 11) {
            console.log(match[2]);
            let sepratedID = match[2];
            let embedUrl = '//www.youtube.com/embed/' + sepratedID;
            return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }

     }

   }
}