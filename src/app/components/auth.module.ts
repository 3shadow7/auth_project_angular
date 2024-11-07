import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



export interface signup_interface {
  id:number;
  Registration_Number : any;
  passport_Number? : number | null;
  country_member_Number? : number | null;
  phone:number | null;
  email:string | null;
  password : string | null ;
  is_active : boolean ;
  createdAt : Date ;
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SignUpModule {


}
