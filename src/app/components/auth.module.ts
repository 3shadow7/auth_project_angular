import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



// export interface signup_interface {
//   id:number;
//   email:string | null;
//   phone:number | null;
//   Registration_Number : number | null;
//   passport_Number? : number | null;
//   country_member_Number? : number | null;
//   createdAt : Date ;
// }

export class signup {
 id:number;
  email:string | null;
  phone:number | null;
  Registration_Number : number | null;
  passport_Number? : number | null;
  country_member_Number? : number | null;
  createdAt : Date ;
  constructor(){
    this.id= 0;
    this.email= null;
    this.phone= null ;
    this.Registration_Number= null;
    this.passport_Number= null;
    this.country_member_Number= null;
    this.createdAt=new Date();
  }
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
