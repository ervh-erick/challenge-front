import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credential } from '../../models/credential';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{

  credential: Credential = {
   login: '',
   password: ''
  }


  login = new FormControl(null, Validators.minLength(3));
  password = new FormControl(null, Validators.minLength(3));

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router : Router){}


  ngOnInit(): void {
  }

  executeLogin(){
    this.authService.authenticate(this.credential).subscribe(response=> {
      this.authService.success(response);
      this.router.navigate(['me'])
    }, (error ) => {
      this.toastr.error("Invalid login or password", "Login fail")
    });
    }

  isValid(): boolean {
    return this.login.valid && this.password.valid
  }



}
