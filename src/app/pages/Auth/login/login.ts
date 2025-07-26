import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Add any necessary properties or methods for the login component
  email!: string;
  password!: string;

  loginForm : FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;

    console.log('Login attempted with:', this.email, this.password);
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Handle successful login, e.g., redirect to dashboard
        // if the email is not confirmed, redirect to confirm email page
        // if the login is first time, redirect to continue registration page
        // else store the tokens and
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error, e.g., show an error message
      }
    });
  }

}
