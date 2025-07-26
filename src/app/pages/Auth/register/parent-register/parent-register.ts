import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { ParentRegisterDTO} from '../../../../models/User/user-register-dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-register',
  imports: [ReactiveFormsModule],
  templateUrl: './parent-register.html',
  styleUrl: './parent-register.css'
})
export class ParentRegister {
registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', Validators.required),
      address: new FormControl(null, Validators.required),
      phonenumber: new FormControl('', Validators.required),
      nationalId: new FormControl('', Validators.required)
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
      birthdate: new Date(formData.birthdate)
    };
    console.log(parentData);
    this.authService.registerParent(parentData).subscribe({
      next: (resp) => {
        console.log(resp);
        // this.router.navigate(['/registration-success']);
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
