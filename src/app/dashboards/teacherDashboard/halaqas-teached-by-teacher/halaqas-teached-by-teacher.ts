import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IHalaqaTeacher } from '../../../models/teacher/halaqa_teacher/ihalaqa-teacher';
import { HalaqaTeacherService } from '../../../services/halaqa-teacher-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IHalaqaNamesList } from '../../../models/Halaqaa/ihalaqa-names-list';
import { FormsModule } from '@angular/forms';
import { JwtService } from '../../../services/jwt-service';

@Component({
  selector: 'app-halaqas-teached-by-teacher',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './halaqas-teached-by-teacher.html',
  styleUrl: './halaqas-teached-by-teacher.css',
})
export class HalaqasTeachedByTeacher {
  userRole: string = '';
  halaqas: IHalaqaTeacher[] = [];
  teacherId: number = 0;
  notAssignedHalaqas: IHalaqaNamesList[] = [];
  halaqaId: number = 0;
  @ViewChild('closeAddHalaqaModalBtn') closeAddHalaqaModalBtn!: ElementRef;
  constructor(
    private halaqaTeacherService: HalaqaTeacherService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) {}
  ngOnInit(): void {
    this.teacherId = this.route.snapshot.params['teacherId'];
    this.userRole = this.jwtService.getDecodedAccessToken().role;
    this.halaqaTeacherService
      .getHalaqaTeacherByTeacherId(this.teacherId)
      .subscribe({
        next: (halaqas) => {
          this.halaqas = halaqas;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  getNotAssignedHalaqas() {
    this.halaqaTeacherService
      .GetHalaqasNotAssignToTeacher(this.teacherId)
      .subscribe({
        next: (halaqas) => {
          this.notAssignedHalaqas = halaqas;
          this.cdr.detectChanges();
        },
      });
  }
  addHalaqa(halaqaId: number) {
    if (halaqaId == 0) {
      alert('يجب اختيار الحلقة');
      return;
    }
    this.halaqaTeacherService
      .createHalaqaTeacher(halaqaId, this.teacherId)
      .subscribe({
        next: (halaqaTeacher) => {
          this.halaqaTeacherService
            .getHalaqaTeacherByTeacherId(this.teacherId)
            .subscribe({
              next: (halaqas) => {
                this.halaqas = halaqas;
                this.halaqaId = 0;
                this.getNotAssignedHalaqas();
              },
            });
          if (this.closeAddHalaqaModalBtn) {
            this.closeAddHalaqaModalBtn.nativeElement.click();
          }
          this.cdr.detectChanges();
        },
      });
  }
  removeHalaqa(halaqaId: number) {
    this.halaqaTeacherService
      .deleteHalaqaTeacher(halaqaId, this.teacherId)
      .subscribe({
        next: () => {
          this.halaqas = this.halaqas.filter(
            (halaqa) => halaqa.halaqaId !== halaqaId
          );
        },
      });
  }
}
