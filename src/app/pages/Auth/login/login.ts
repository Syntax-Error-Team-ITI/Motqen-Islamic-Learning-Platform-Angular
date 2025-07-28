import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  failedTologin = false;
  errorMessage = '';

  email!: string;
  password!: string;
  rememberMe!: boolean;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.rememberMe = this.loginForm.value.rememberMe;

    console.log('Login attempted with:', this.email, this.password);
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.failedTologin = false;
        console.log('Login successful:', response); 

        if (this.rememberMe) {
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
        }else{
          sessionStorage.setItem("accessToken", response.accessToken);
          sessionStorage.setItem("refreshToken", response.refreshToken);
        } 
        this.loginForm.reset();
        this.loginForm.markAsUntouched();
        this.loginForm.markAsPristine();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.failedTologin = true;
        this.errorMessage = error.error.error;
      }
    });
  }

}
