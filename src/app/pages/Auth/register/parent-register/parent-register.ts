import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { ParentRegisterDTO } from '../../../../models/User/user-register-dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-parent-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './parent-register.html',
  styleUrl: './parent-register.css'
})
export class ParentRegister {
  emailExample = 'example@domain.com';

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\- ]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\- ]+$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', Validators.required),
      address: new FormControl(null, Validators.required),
      phonenumber: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]),
      nationalId: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^[0-9]{14}$/)])
    });


  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.error("form invalid");
      this.markAllAsTouched();
      return;
    }
    const formData = this.registerForm.value;
    const parentData: ParentRegisterDTO = {
      ...formData,
      // birthdate: new Date(formData.birthdate)
    };
    console.log(parentData);
    this.authService.registerParent(parentData).subscribe({
      next: (resp) => {
        console.log(resp);
        this.registerForm.reset();
        this.registerForm.markAsUntouched();
        this.registerForm.markAsPristine();
        alert("successful registration, check your email for verification");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
