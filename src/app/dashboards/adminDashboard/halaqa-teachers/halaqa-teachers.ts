import { ActivatedRoute, RouterModule } from '@angular/router';
import { IHalaqaTeacher } from '../../../models/teacher/halaqa_teacher/ihalaqa-teacher';
import { HalaqaTeacherService } from './../../../services/halaqa-teacher-service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { IHalaqaNamesList } from '../../../models/Halaqaa/ihalaqa-names-list';
import { ITeacher } from '../../../models/teacher/iteacher';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-halaqa-teachers',
  imports: [FormsModule,RouterModule ],
  templateUrl: './halaqa-teachers.html',
  styleUrl: './halaqa-teachers.css',
})
export class HalaqaTeachers {
  constructor(private halaqaTeacherService : HalaqaTeacherService,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ){}
  halaqaTeachers: ITeacher[] = [];
  unassignedTeachers: ITeacher[] = [];
  teacherId: number = 0;
  halaqaId: number = 0;
  halaqaName: string = '';
selectedTeacherId: number | null = null;
forname!:IHalaqaTeacher[];
  ngOnInit() {
  this.route.params.subscribe((params) => {
    this.halaqaId = +params['id'];
    this.halaqaTeacherService.getHalaqaTeacherByHalaqaId(this.halaqaId).subscribe({
      next: (data) => {
        this.forname = data;
        this.halaqaName = this.halaqaTeachers.length > 0 ? this.forname[0].halaqaName : '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading halaqa teachers:', error);
      }
    });
    this.loadHalaqaTeachers(this.halaqaId);
    this.loadUnassignedTeachers();

  });
}

  loadHalaqaTeachers(halaqaId : number ) {
    this.halaqaTeacherService.getTeacherAssignedToHalaqa(halaqaId).subscribe({
      next: (data) => {
        this.halaqaTeachers = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading halaqa teachers:', error);
      }
    });
  }
  loadUnassignedTeachers() {
    this.halaqaTeacherService.getTeacherNotAssignedToHalaqa(this.halaqaId).subscribe({
      next: (data) => {
        this.unassignedTeachers = data;
        console.log(this.unassignedTeachers);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading unassigned teachers:', error);
      }
    });
  }

addTeacherToHalaqa() {
  if (!this.selectedTeacherId) return;

  this.halaqaTeacherService.createHalaqaTeacher(this.halaqaId, this.selectedTeacherId).subscribe({
    next: (data) => {
      this.loadHalaqaTeachers(this.halaqaId);
      this.loadUnassignedTeachers();
      this.selectedTeacherId = null;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error adding teacher to halaqa:', error);
    }
  });
}

  removeTeacherFromHalaqa( teacherId: number) {
    this.halaqaTeacherService.deleteHalaqaTeacher(this.halaqaId, teacherId).subscribe({
      next: () => {
        this.loadHalaqaTeachers(this.halaqaId);
        this.loadUnassignedTeachers();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error removing teacher from halaqa:', error);
      }
    });

}
}
