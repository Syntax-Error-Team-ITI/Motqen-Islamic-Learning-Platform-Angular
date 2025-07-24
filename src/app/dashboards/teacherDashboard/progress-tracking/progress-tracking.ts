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
  date: Date = new Date();
  halaqaId: number = 0;
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
    let index = 0;
    this.students.forEach((student) => {
      const progress: IProgressForm = {
        studentId: student.id,
        halaqaId: this.halaqaId,
        isQuranTracking: this.isQuranTracking,
        date: this.date,
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
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
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
}
