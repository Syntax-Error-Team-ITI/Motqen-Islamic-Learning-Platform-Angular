import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { emit } from 'process';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterModule, FormsModule],
  templateUrl: './confirm-email.html',
  styleUrl: './confirm-email.css'
})
export class ConfirmEmail {
  resendToEmail!: string;
  isSuccess = false;
  isResent = false;
  errorMessage: string ='';
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
    if (this.userId == null || this.token === null) {
      console.log("worng attempt must only be via email link sent to you");
      return;
    }
    this.authService.confirmEmail(this.userId, this.token).subscribe({
      next: (response) => {
        this.isSuccess = true;
        console.log(response);
      },
      error: (e) => {
        console.log(e);
        console.log(this.token);

      }
    });
  }

  resendConfirmation() {
    console.log(this.resendToEmail);
    if (this.resendToEmail == null) {
      console.log("type your registered email");
      return;
    }
    console.log("confirmation email re sent to the user with email: " + this.resendToEmail);
    this.authService.resendConfirmationEmail(this.resendToEmail).subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e) => {
        console.log(e.error.gg);
        this.errorMessage = e.error.gg;
      }
    });
  }


}