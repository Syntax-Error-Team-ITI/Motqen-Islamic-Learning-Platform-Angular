import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student-service';
import { IHalaqaStudentDisplayHalaqa } from '../../../models/student/ihalaqa-student-display-halaqa';

@Component({
  selector: 'app-halaqas-enrolled-by-student',
  imports: [RouterLink],
  templateUrl: './halaqas-enrolled-by-student.html',
  styleUrl: './halaqas-enrolled-by-student.css',
})
export class HalaqasEnrolledByStudent implements OnInit {
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
        console.log(this.halaqas);
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
