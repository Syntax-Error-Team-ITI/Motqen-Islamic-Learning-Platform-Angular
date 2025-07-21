import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student-service';
import { IHalaqaStudentDisplayHalaqa } from '../../../models/student/ihalaqa-student-display-halaqa';

@Component({
  selector: 'app-display-halaqa-for-student',
  imports: [],
  templateUrl: './display-halaqa-for-student.html',
  styleUrl: './display-halaqa-for-student.css',
})
export class DisplayHalaqaForStudent implements OnInit {
  studentId: number = 0;
  halaqas: IHalaqaStudentDisplayHalaqa[] = [];
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.studentService.getAllHalaqaForStudent(this.studentId).subscribe({
      next: (halaqas) => {
        this.halaqas = halaqas;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  joinHalaqa(guestLiveLink: string) {
    this.router.navigate(['/join-halaqa', guestLiveLink]);
    this.cdr.detectChanges();
  }
}
