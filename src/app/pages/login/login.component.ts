import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  signupForm: FormGroup;
  submitted = false;
  currentUser = {};
  errorMsg: any;
 

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
     
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }
  get l () { return this.loginForm.controls; }

  ngOnInit(): void {
    this.toggleForm();
  }

  loginUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let loweremail = this.loginForm.get('email').value.toLowerCase();
    this.loginForm.get('email').setValue(loweremail);
    this.authService.signIn(this.loginForm.value).subscribe((tkn: any) => {
      // console.log(tkn);
      localStorage.setItem('access_token', tkn.token)
      this.authService.getUserProfile(tkn._id).subscribe((res) => {
        // console.log(res)
        this.currentUser = res;
        var uid = res.msg._id
        localStorage.setItem('uid', uid)
        this.router.navigate(['home']);
      })
    },
    (err) => { 
      // console.log(err)
       this.errorMsg = "Unauthorized! Check username or password"
    });
  }

  toggleForm() {
    document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
    });
  }
 
  registerUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }    
    
    let loweremail = this.signupForm.get('email').value.toLowerCase( );    
    this.signupForm.get('email').setValue(loweremail);
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        //this.router.navigate(['login']);
        document.querySelector('.cont').classList.toggle('s--signup');
        var message = "Profile created. Please login";
        window.alert(message);
      }
    })
  }
  
}