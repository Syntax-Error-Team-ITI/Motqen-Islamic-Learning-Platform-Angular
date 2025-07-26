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
  newSchedule: IclassScheduleForm = {
    day: 0,
    startTime: '',
    endTime: '',
    halaqaId: 0,
    id: 0,
  };
  editSchedule: IclassScheduleForm = {
    day: 0,
    startTime: '',
    endTime: '',
    halaqaId: 0,
    id: 0,
  };
  editingScheduleId: number = 0;
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
      this.newSchedule.halaqaId = this.halaqaId;
      this.editSchedule.halaqaId = this.halaqaId;
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
    this.newSchedule.day = Number(this.newSchedule.day);
    this.halaqaService
      .addClassSchedule(this.halaqaId, this.newSchedule)
      .subscribe(() => {
        this.loadHalaqa();
        this.newSchedule = {
          day: 0,
          startTime: '',
          endTime: '',
          halaqaId: this.halaqaId,
          id: 0,
        };
        (window as any).bootstrap?.Modal.getOrCreateInstance(
          document.getElementById('addScheduleModal')
        ).hide();
      });
  }

  startEditSchedule(schedule: any) {
    this.editingScheduleId = schedule.id;
    this.editSchedule = {
      day: Number(schedule.day),
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      halaqaId: this.halaqaId,
      id: schedule.id,
    };
  }

  updateSchedule() {
    this.editSchedule.day = Number(this.editSchedule.day);
    if (this.editingScheduleId !== null) {
      this.halaqaService
        .updateClassSchedule(
          this.halaqaId,
          this.editingScheduleId,
          this.editSchedule
        )
        .subscribe(() => {
          this.loadHalaqa();
          this.editSchedule = {
            day: 0,
            startTime: '',
            endTime: '',
            halaqaId: this.halaqaId,
            id: this.editingScheduleId,
          };
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
