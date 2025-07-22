import {
  Component,
  ChangeDetectorRef,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../../services/student-service';
import { IStudentHalaqaDisplay } from '../../../models/student/istudent-halaqa-display';
import { HalaqaStudentService } from '../../../services/halaqa-student-service';
import { IStudentShortDisplay } from '../../../models/student/istudent-short-display';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-students-for-halaqa',
  imports: [RouterLink, FormsModule],
  templateUrl: './display-students-for-halaqa.html',
  styleUrl: './display-students-for-halaqa.css',
})
export class DisplayStudentsForHalaqa implements OnInit {
  halaqaId: number = 0;
  studentId: number = 0;
  students: IStudentHalaqaDisplay[] = [];
  studentsNotInHalaqa: IStudentShortDisplay[] = [];
  @ViewChild('closeAddStudentModalBtn') closeAddStudentModalBtn!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private halaqaStudentService: HalaqaStudentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.halaqaId = params['id'];
    });

    this.studentService.getAllStudentsForHalaqa(this.halaqaId).subscribe({
      next: (students: IStudentHalaqaDisplay[]) => {
        this.students = students;
        // console.log(this.students);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  removeStudentFromHalaqa(studentId: number) {
    this.halaqaStudentService
      .removeStudentFromHalaqa(studentId, this.halaqaId)
      .subscribe({
        next: () => {
          this.students = this.students.filter(
            (student) => student.id !== studentId
          );
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  addStudentToHalaqa(studentId: number) {
    if (studentId === 0) {
      return;
    }
    this.halaqaStudentService
      .assignStudentToHalaqa({
        studentId: studentId,
        halaqaId: this.halaqaId,
        dateJoined: new Date(),
      })
      .subscribe({
        next: () => {
          this.studentsNotInHalaqa = this.studentsNotInHalaqa.filter(
            (student) => student.id !== studentId
          );
          this.studentService.getAllStudentsForHalaqa(this.halaqaId).subscribe({
            next: (students: IStudentHalaqaDisplay[]) => {
              this.students = students;
              this.studentId = 0;
            },
          });
          this.cdr.detectChanges();
          // Close the modal programmatically
          if (this.closeAddStudentModalBtn) {
            this.closeAddStudentModalBtn.nativeElement.click();
          }
        },
      });
  }
  getStudentsNotInHalaqa() {
    this.studentService.getStudentsNotInHalaqa(this.halaqaId).subscribe({
      next: (students: IStudentShortDisplay[]) => {
        this.studentsNotInHalaqa = students;
      },
    });
  }
}
