import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterModule],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css'
})
export class ConfirmEmail {
  isSuccess = false;
  // isLoading = true;
  userId = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
    });
  }

  confirmEmail() {
    console.log(this.userId);
    console.log(this.token);
    this.authService.confirmEmail(this.userId, this.token).subscribe({
      next: (response) => {
        this.isSuccess = true;
        console.log(response);
        // this.isLoading = false;
        // Optional: Auto-login the user after confirmation
        // setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (e) => {
        console.log(e);
        console.log(this.token);
        // this.errorMessage = e.error?.message || 'Email confirmation failed';
        // this.isLoading = false;
      }
    });
  }

  resendConfirmation() {
    // this.isLoading = true;
    console.log("confirmation email re sent to the user with id: "+this.userId);
    this.authService.resendConfirmationEmail(this.userId).subscribe({
      next: (r) => {
        console.log(r);
        // this.errorMessage = 'New confirmation email sent. Please check your inbox.';
        // this.isLoading = false;
      },
      error: (e) => {
        console.log(e);
        // this.errorMessage = e.error?.message || 'Failed to resend confirmation email';
        // this.isLoading = false;
      }
    });
  }
}
