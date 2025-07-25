import { IClassSchedule } from './../../../models/Halaqaa/iclass-schedule';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HalaqaService } from '../../../services/halaqa-service';
import { IHalaqaDetailsDto } from '../../../models/Halaqaa/ihalaqa-details-dto';
import { CommonModule } from '@angular/common';

import { IclassScheduleForm } from '../../../models/Halaqaa/iclass-schedule-form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-halaqa-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './halaqa-details.html',
  styleUrls: ['./halaqa-details.css'],
})
export class HalaqaDetails implements OnInit {
  halaqa: IHalaqaDetailsDto = {
    id: 0,
    name: '',
    description: '',
    guestLiveLink: '',
    hostLiveLink: '',
    subjectName: '',
    genderGroup: 0,
    isDeleted: false,
    classSchedules: [],
  };
  newSchedule: IclassScheduleForm = { day: 0, startTime: '', endTime: '' };
  editSchedule: IclassScheduleForm = { day: 0, startTime: '', endTime: '' };
  editingScheduleId: number | null = null;
  halaqaId: number = 0;

  constructor(
    private halaqaService: HalaqaService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.halaqaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.halaqaId) {
      this.loadHalaqa();
    }
  }

  loadHalaqa() {
    this.halaqaService.getHalaqaById(this.halaqaId).subscribe({
      next: (data) => {
        this.halaqa = data;
        console.log(this.halaqa.classSchedules);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addSchedule() {
    this.halaqaService
      .addClassSchedule(this.halaqaId, this.newSchedule)
      .subscribe(() => {
        this.loadHalaqa();
        this.newSchedule = { day: 0, startTime: '', endTime: '' };
        (window as any).bootstrap?.Modal.getOrCreateInstance(
          document.getElementById('addScheduleModal')
        ).hide();
      });
  }

  startEditSchedule(schedule: any) {
    this.editingScheduleId = schedule.id;
    this.editSchedule = {
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    };
    
  }

  updateSchedule() {
    if (this.editingScheduleId !== null) {
      this.halaqaService
        .updateClassSchedule(
          this.halaqaId,
          this.editingScheduleId,
          this.editSchedule
        )
        .subscribe(() => {
          this.loadHalaqa();
          this.editingScheduleId = null;
          (window as any).bootstrap?.Modal.getOrCreateInstance(
            document.getElementById('updateScheduleModal')
          ).hide();
        });
    }
  }

  deleteSchedule(scheduleId: number) {
    this.halaqaService
      .deleteClassSchedule(this.halaqaId, scheduleId)
      .subscribe(() => {
        this.loadHalaqa();
      });
  }

  restoreSchedule(scheduleId: number) {
    this.halaqaService
      .restoreClassSchedule(this.halaqaId, scheduleId)
      .subscribe(() => {
        this.loadHalaqa();
      });
  }

  getDayName(day: number): string {
    const days = [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ];
    return days[day] ?? '';
  }
}
