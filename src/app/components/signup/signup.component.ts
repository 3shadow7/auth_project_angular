import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { interval, Subscription } from 'rxjs';
import { InputOtpModule } from 'primeng/inputotp';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { signup_interface } from '../auth.module';

import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ToastModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputMaskModule,
    InputOtpModule,
    RippleModule,
  ],
  providers: [MessageService],

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnDestroy {
  //? helpers
  index: number = 0; //* to go forword and back of pages and do other stff linked with pages
  error: string = ''; //* it takes the errors of elements to show it in alert danger
  password_eye1: boolean = false; //* to show and hide password inputs of [set-password]
  password_eye2: boolean = false; //* to show and hide password inputs of [conform-password]
  conform_password!: string; //* to check that the password is typed as the user expects

  //? data form
  form : signup_interface ={
    id: 0,
    Registration_Number: '',//? if first index is 1 u see passport input fuild || if first index is 2 u see country member input fuild
    passport_Number: null,
    country_member_Number: null,
    phone: null,
    email: null,
    password : null ,
    is_active : false ,
    createdAt: new Date(),
  }



  //? verified setup
  verified_with!: 'phone' | 'email';
  verified_page: boolean = false;
  inputOtp!: number;

  //?timer
  timer: number = 10 * 60; //* it is 10 min
  min: number = 0;
  sec: number = 0;
  subscription!: Subscription;

  constructor(private messageService: MessageService,private router : Router) {}
  //! next page func
  next(index: number) {
    if (index === 0) {
      if (!this.Field_Requirements_Alert(0)) {
        this.index++;
        console.log('page 2 active ', this.index);
      }
    } else if (index === 1) {
      if (!this.Field_Requirements_Alert(1)) {
        this.index++;
        console.log('page 3 active ', this.index);
      }
    } else if (index === 2) {
      if (!this.Field_Requirements_Alert(2)) {
        this.index++;
        console.log('page 4 active ', this.index);
      }
    }
  }

  //! back page func
  back(event: Event, index: number) {
    event.preventDefault(); //* to make the url link of <e></e> element not work
    if (index === 1) {
      this.index--;
      console.log('page 0 active ', this.index);
    } else if (index === 2) {
      this.index--;
      console.log('page 1 active ', this.index);
    }
  }

  //! submit form of the 3 pages and verified it with database ,
  //? then if there is no email or phone ,
  //? then create new one and give us back the result was True ,
  //? to move our user to the page of code verified
  verified_it(With: any) {
    console.log('verified value : ', With);
    this.onSubmit();
    this.verified_with = With;
    this.verified_page = true;
  }

  onSubmit() {
    console.log('data goes to back-end');
    this.startTimer();
  }

  //! timer
  startTimer(): void {
    this.subscription = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
        this.formattedTime();
      } else {
        this.subscription.unsubscribe();
      }
    });
  }

  formattedTime(): void {
    this.min = Math.floor(this.timer / 60);
    this.sec = this.timer % 60;
  }
  //! send verified code to back-end
  sendcode() {
    if (!this.Field_Requirements_Alert(2)) {
      console.log('data goes to back end : ', this.inputOtp); //* to check the verified code and response us true to go to the next page

      //do some logic between front end and back end , when response give us true then make our user go to next page && also make the is_active = true in back-end

      this.next(this.index++); //* our user go to the page [4]
    }
  }

  //! error Alert of [3 pages] setup
  Field_Requirements_Alert(index: number) {
    //! here were error alert of page [1]
    if (index === 0) {
      if (!this.form.Registration_Number) {
        this.error = 'عليك ادخال رقم القيد اولا';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      } else if (this.form.Registration_Number) {
        let isInvalidFormat = /[a-zA-Z]/.test(this.form.Registration_Number.toString());
        if(isInvalidFormat){
        this.error = 'يجب ان يكون ارقام فقط';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
        }

      }


      if (!this.form.passport_Number && !this.form.country_member_Number) {
        this.error = 'عليك ملئ كل الحقول اولا';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      }

      if (this.form.passport_Number) {
        let isInvalidFormat = /[a-zA-Z]/.test(this.form.passport_Number.toString());
        if(isInvalidFormat){
        this.error = 'يجب ان يكون ارقام فقط';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
        }

      }

      if (this.form.country_member_Number) {
        let isInvalidFormat = /[a-zA-Z]/.test(this.form.country_member_Number.toString());
        if(isInvalidFormat){
        this.error = 'يجب ان يكون ارقام فقط';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
        }

      }


      return false; //* means no error in page 1 and u can pass

      //! here were error alert of page [2]
    } else if (index === 1) {
      if (!this.form.phone) {
        this.error = 'عليك ادخال رقم الهاتف';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      } else if (!this.form.email) {
        this.error = 'عليك ادخال البريد الإلكتروني';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      } else if (this.form.email) {
        let email = this.form.email;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
        const isValid = emailPattern.test(email);
        if (isValid) {
          // no action needed
        } else {
          this.error = 'كتابتك في البريد الإلكتروني غير صحيحة';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: this.error,
          });
          return true;
        }
      }
      return false; //* means no error in page 2 and u can pass

      //! here were error alert of page [3]
    } else if (index === 2) {
      if (4 === this.inputOtp?.toString().length) {
        // No action needed
      } else {
        this.error = 'عليك ادخال رمز التحقق اولا';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      }
      return false; //* means no error in page 3 and u can pass

      //! here were error alert of page [4]
    } else if (index === 3) {
      if (!this.form.password || !this.conform_password) {
        console.log('Password:', this.form.password);
        console.log('Confirm Password:', this.conform_password);
        this.error = 'عليك ملئ كل الحقول اولا';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      } else if (this.form.password.length < 8) {
        this.error = 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      } else if (this.form.password !== this.conform_password) {
        this.error = 'تأكد من ان كلمة المرور كتبت بشكل مطابق';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
        });
        return true;
      }

      return false; //* means no error in page 4 and u can pass
    }

    //=============
    this.error = ''; //* to clean the value
    return false; //* in case there is index out of our 3 pages we will not show any alert error
  }
  //! password eye - hide and show value
  eye(value: string) {
    if (value === 'set-password') {
      console.log('hi password');
      this.password_eye1 = !this.password_eye1;
    } else if (value === 'conform-password') {
      this.password_eye2 = !this.password_eye2;
    }
    console.log('hi there');
  }
  //! submit all data
  signup_is_done() {
    if (!this.Field_Requirements_Alert(3)) {


      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'thanks for register',
      });
      console.log('all data goes to back-end ', {...this.form, createdAt : new Date()}); // send this data to back-end to complete register logic

      this.router.navigate(['/dashboard'], { queryParams: { from: 'logout' } });

    }
  }

  //! destroy component
  ngOnDestroy(): void {
    console.log('destroy');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
