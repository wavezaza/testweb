import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router){}

  loginPage(){
    console.log(this.email);
    console.log(this.password);
    if(this.email === 'aa@bb.cc' && this.password === '1234') {
      this.router.navigate(['/home'])
    }else{
      console.log('test2');
    }
  }
}
