import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { StudentRegisterDTO } from '../../../../models/User/user-register-dto';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-register',
  imports: [ReactiveFormsModule],
  templateUrl: './student-register.html',
  styleUrl: './student-register.css'
})
export class StudentRegister {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', Validators.required),
      birthdate: new FormControl(null, Validators.required),
      gender: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      parentNationalId: new FormControl('', Validators.required)
    });


  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.error("form invalid");
      this.markAllAsTouched();
      return;
    }
    const formData = this.registerForm.value;
    const studentData: StudentRegisterDTO = {
      ...formData,
      birthdate: new Date(formData.birthdate)
    };
    console.log(studentData);
    this.authService.registerStudent(studentData).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/registration-success']);
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
