import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ITeacher } from '../../../models/teacher/iteacher';

@Component({
  selector: 'app-teacher-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.css',
})
export class TeacherList {
  teachers: ITeacher[] = [];
  constructor(
    private teacherService: TeacherService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
