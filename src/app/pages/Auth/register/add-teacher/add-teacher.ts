import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';
import { AddTeacherDTO } from '../../../../models/User/user-register-dto';


@Component({
  selector: 'app-add-teacher',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-teacher.html',
  styleUrl: './add-teacher.css'
})
export class AddTeacher {
  emailExample = 'example@domain.com';
  isAgeTamam = true;

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\- ]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\- ]+$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', Validators.required),
      gender: new FormControl('', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\- ]+$/)]),
      age: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)])
    });

  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      if (this.registerForm.value.age < 22) {this.isAgeTamam = false;} else this.isAgeTamam = true;
      console.error("form invalid");
      this.markAllAsTouched();
      return;
    }
    if (this.registerForm.value.age < 22) {
      this.isAgeTamam = false;
      this.markAllAsTouched();
      return;
    }else 
      this.isAgeTamam = true;

    const formData = this.registerForm.value;
    const teacherData: AddTeacherDTO = { ...formData };
    console.log(teacherData);
    this.authService.addTeacher(teacherData).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigate(['/dashboard/halaqa-list'])
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
