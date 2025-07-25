import { Component, OnInit } from '@angular/core';
import { HalaqaService } from '../../../services/halaqa-service';
import { ProgressTrackingService } from '../../../services/progress-tracking-service';
import { IHalaqaNamesList } from '../../../models/Halaqaa/ihalaqa-names-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-attendance',
  imports: [FormsModule,CommonModule],
  templateUrl: './student-attendance.html',
  styleUrl: './student-attendance.css',
})
export class StudentAttendance implements OnInit {
  halaqaNamesList: IHalaqaNamesList[] = [];
  selectedHalaqaId: number | null = null;
  selectedHalaqaName: string = '';
  selectedDate: string = '';
  attendanceList: any[] = [];
  attendanceLoaded: boolean = false;
  loading: boolean = false;

  constructor(
    private halaqaService: HalaqaService,
    private progressTrackingService: ProgressTrackingService
  ) {}

  ngOnInit(): void {
    this.halaqaService.getHalaqaNamesList().subscribe({
      next: (list) => {
        this.halaqaNamesList = list;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onHalaqaChange(event: Event) {
    this.selectedHalaqaName = this.halaqaNamesList.find(
      (halaqa) => halaqa.id === this.selectedHalaqaId
    )?.name || '';
  }

  onLoadAttendance() {
    if (!this.selectedHalaqaId || !this.selectedDate) return;
    this.loading = true;
    this.attendanceLoaded = false;
    this.progressTrackingService
      .getStudentAttendance(this.selectedHalaqaId, this.selectedDate)
      .subscribe({
        next: (data) => {
          this.attendanceList = data;
          this.attendanceLoaded = true;
          this.loading = false;
        },
        error: (err) => {
          this.attendanceList = [];
          this.attendanceLoaded = true;
          this.loading = false;
          console.error(err);
        },
      });
  }
}
