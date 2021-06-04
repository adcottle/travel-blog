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
 

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
    this.authService.signIn(this.loginForm.value)
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

    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset()
        //this.router.navigate(['login']);
        document.querySelector('.cont').classList.toggle('s--signup');
        var message = "Profile created. Please login";
        window.alert(message);
      }
    })
  }

}