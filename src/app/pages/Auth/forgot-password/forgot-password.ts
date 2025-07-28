import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserResetPasswordDTO } from '../../../models/User/user-register-dto';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword implements OnInit {
  isEmailSent: boolean = false;
  email!: string;
  userId!: string;
  token!: string;
  inputData!: UserResetPasswordDTO;
  changePasswordForm: FormGroup;
  typeYourEmailForm: FormGroup;
  emailExample = 'example@domain.com';


  constructor(private authService: AuthService, private route: ActivatedRoute) {

    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmNewPassword: new FormControl('', Validators.required)
    });

    this.typeYourEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
    });

    if (this.userId != null && this.token != null) {
      this.isEmailSent = true;
    }

  }

  onSubmit() {
    if (!this.isEmailSent) {
      this.email = this.typeYourEmailForm.value.email;
      console.log(this.email);
      this.authService.forgotPassword(this.email).subscribe({
        next: (r) => {
          console.log(r);
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
    else {
      this.inputData = {
        userId : this.userId,
        token : this.token,
        newPassword : this.changePasswordForm.value.newPassword,
        confirmNewPassword : this.changePasswordForm.value.confirmNewPassword
      }
      console.log(this.inputData);

      this.authService.changePassword(this.inputData).subscribe({
        next: (r) => {
          console.log(r);
        },
        error: (e) => {
          console.error(e);
        }
      });
    }

  }


}
