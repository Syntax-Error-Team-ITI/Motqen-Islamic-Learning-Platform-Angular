import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IStudentList } from '../../../models/student/istudent-list';
import { StudentService } from '../../../services/student-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: IStudentList[] = [];
  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
        console.log(this.students);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
