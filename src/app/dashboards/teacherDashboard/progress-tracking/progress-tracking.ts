import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  QURAN_SURAHS_AR,
  QURAN_AYA_NUMBERS,
} from '../../../models/iquran-list';
import { IStudentHalaqaDisplay } from '../../../models/student/istudent-halaqa-display';
import { StudentService } from '../../../services/student-service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IHalaqaNamesList } from '../../../models/Halaqaa/ihalaqa-names-list';
import { HalaqaService } from '../../../services/halaqa-service';
import { ProgressTrackingService } from '../../../services/progress-tracking-service';
import { IProgressForm } from '../../../models/ProgressTracking/iprogress-form';

@Component({
  selector: 'app-progress-tracking',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './progress-tracking.html',
  styleUrl: './progress-tracking.css',
})
export class ProgressTracking implements OnInit {
  halaqaNamesList: IHalaqaNamesList[] = [];
  students: IStudentHalaqaDisplay[] = [];
  evaluation: string[] = [];
  notes: string[] = [];
  status: string[] = [];
  date: string = this.getTodayString();
  halaqaId: number = 1;
  // QuranProgressTracking
  fromSurah: number = 0;
  toSurah: number = 0;
  fromAyah: number = 1;
  toAyah: number = 1;
  numberOfLines: number = 1;
  type: number = 0;
  // IslamicSubjectsProgressTracking
  fromPage: number = 0;
  toPage: number = 0;
  lessonName: string = '';

  quranList: string[] = QURAN_SURAHS_AR;
  ayaNumbers: number[] = QURAN_AYA_NUMBERS;
  isQuranTracking: boolean = true;
  validationErrors: string[] = [];

  constructor(
    private studentService: StudentService,
    private halaqaService: HalaqaService,
    private progressService: ProgressTrackingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadHalaqaNamesList();
  }

  loadStudents() {
    if (this.halaqaId == 0) {
      this.students = [];
      this.initializeForms();
      this.cdr.detectChanges();
      return;
    }
    this.studentService.getAllStudentsForHalaqa(this.halaqaId).subscribe({
      next: (students) => {
        this.students = students;
        this.initializeForms();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadHalaqaNamesList() {
    this.halaqaService.getHalaqaNamesList().subscribe({
      next: (halaqaNamesList) => {
        this.halaqaNamesList = halaqaNamesList;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  initializeForms() {
    this.evaluation = [];
    this.notes = [];
    this.status = [];
    this.fromSurah = 0;
    this.toSurah = 0;
    this.fromAyah = 1;
    this.toAyah = 1;
    this.numberOfLines = 1;
    this.type = 0;
    this.fromPage = 0;
    this.toPage = 0;
    this.lessonName = '';
    this.date = this.getTodayString();
  }

  onFromSurahChange() {
    this.fromAyah = 1;
    // this.progressForm[index].controls['fromAyah'].setValue(1);
  }

  onToSurahChange() {
    this.toAyah = 1;
    // this.progressForm[index].controls['toAyah'].setValue(1);
  }

  getAyahRange(surahIndex: number): number[] {
    if (surahIndex === undefined || surahIndex === null) return [1];
    const ayahCount = this.ayaNumbers[surahIndex];
    return Array.from({ length: ayahCount }, (_, i) => i + 1);
  }

  onProgressSubmit() {
    this.validationErrors = [];
    // Validate main fields
    if (!this.halaqaId || this.halaqaId === 0) {
      this.validationErrors.push('يجب اختيار الفصل.');
    }
    if (!this.date) {
      this.validationErrors.push('يجب اختيار التاريخ.');
    }
    if (this.isQuranTracking) {
      if (!this.fromSurah || !this.toSurah) {
        this.validationErrors.push('يجب اختيار سور البداية والنهاية.');
      }
      if (!this.fromAyah || !this.toAyah) {
        this.validationErrors.push('يجب اختيار آيات البداية والنهاية.');
      }
      if (!this.numberOfLines || this.numberOfLines < 1) {
        this.validationErrors.push('عدد الأسطر يجب أن يكون أكبر من 0.');
      }
    } else {
      if (!this.fromPage || !this.toPage) {
        this.validationErrors.push('يجب إدخال صفحات البداية والنهاية.');
      }
      if (!this.lessonName || this.lessonName.trim() === '') {
        this.validationErrors.push('يجب إدخال اسم الدرس.');
      }
    }
    // Validate per-student fields
    // this.students.forEach((student, i) => {
    //   if (!this.evaluation[i] || this.evaluation[i].trim() === '') {
    //     this.validationErrors.push(`يجب اختيار التقييم للطالب ${student.name}`);
    //   }
    //   if (!this.status[i] || this.status[i].trim() === '') {
    //     this.validationErrors.push(`يجب إدخال الحالة للطالب ${student.name}`);
    //   }
    //   if (!this.notes[i] || this.notes[i].trim() === '') {
    //     this.validationErrors.push(
    //       `يجب إدخال الملاحظات للطالب ${student.name}`
    //     );
    //   }
    // });
    if (this.validationErrors.length > 0) {
      this.cdr.detectChanges();
      return;
    }
    let index = 0;
    this.students.forEach((student) => {
      if (
        this.checkProgressValidation(
          this.notes[index],
          this.status[index],
          this.evaluation[index]
        )
      ) {
        const progress: IProgressForm = {
          studentId: student.id,
          halaqaId: this.halaqaId,
          isQuranTracking: this.isQuranTracking,
          date: new Date(this.date),
          status: this.status[index],
          notes: this.notes[index],
          evaluation: this.evaluation[index],
          fromSurah: this.fromSurah,
          toSurah: this.toSurah,
          fromAyah: this.fromAyah,
          toAyah: this.toAyah,
          numberOfLines: this.numberOfLines,
          type: this.type,
          fromPage: this.fromPage,
          toPage: this.toPage,
          subject: 'dummy subject',
          lessonName: this.lessonName,
          progressTrackingId: 0,
        };
        this.progressService.addProgressTracking(progress).subscribe({
          next: (response) => {
            this.initializeForms();
            this.loadStudents();
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
      index++;
    });
  }
  checkProgressValidation(note: string, status: string, evaluation: string) {
    if (
      !note ||
      !status ||
      !evaluation ||
      note.trim() === '' ||
      status.trim() === '' ||
      evaluation.trim() === ''
    ) {
      return false;
    }
    return true;
  }

  onQuranTrackingChange() {
    this.isQuranTracking = Boolean(this.isQuranTracking);
    this.initializeForms();
  }

  onHalaqaChange() {
    this.halaqaId = Number(this.halaqaId);
    this.initializeForms();
    this.loadStudents();
  }

  getTodayString(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
