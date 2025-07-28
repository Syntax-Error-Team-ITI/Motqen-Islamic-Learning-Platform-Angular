import { HalaqaService } from './../../../services/halaqa-service';
import { ICreateTeacherAttendance, IUpdateTeacherAttendance } from './../../../models/teacher/TeacherAttendance';
import { Component, OnInit } from '@angular/core';
import { TeacherAttendanceService } from '../../../services/teacher-attendanceService';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITeacherAttendance } from '../../../models/teacher/TeacherAttendance';
import { privateDecrypt } from 'crypto';
import { TeacherService } from '../../../services/teacher-service';
import { IHalaqaDto } from '../../../models/Halaqaa/ihalaqa-dto';
import { ITeacher } from '../../../models/teacher/iteacher';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-attendance',
  imports: [ReactiveFormsModule , FormsModule ,CommonModule ],
  templateUrl: './teacher-attendance.html',
  styleUrl: './teacher-attendance.css',
  standalone: true
})
export class TeacherAttendance implements OnInit {
  formModel!: FormGroup;
  teacherAttendance : ITeacherAttendance[] =[];
  isEditMode :boolean = false;
  selectedId : number | null = null;
  loading :boolean = false;
  halaqatList : IHalaqaDto[] = [];
  teachersList : ITeacher[] = [];
  filterHalaqaId: number = 0;
  filterTeacherId: number = 0;


  constructor(
    private fb: FormBuilder,
    private teacherAttendanceService: TeacherAttendanceService,
    private HalaqaService : HalaqaService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.formModel = this.fb.group({
      teacherId: [null],
      halaqaId:[null] ,
      attendanceDate: [new Date().toISOString().split('T')[0]],
      status: [null],

    });

    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.loadAllTeacherAttendance();
    this.loadallHalaqas();
    this.loadallTeachers();
  }
  loadAllTeacherAttendance() {
    this.teacherAttendanceService.getAllAttendance().subscribe({
      next: (res) => this.teacherAttendance = res,
      error: (err) => console.error(err),
      complete: () => this.loading = false
    });
  }
  loadallHalaqas() {
    this.HalaqaService.getHalaqaList().subscribe({
      next: (res) => this.halaqatList = res,
      error: (err) => console.error(err)
    });
  }
  loadallTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (res) => this.teachersList = res,
      error: (err) => console.error(err)
    });
  }
  getAttendanceDate(): string {
  return this.formModel.value.attendanceDate || new Date().toISOString().split('T')[0];
}

  onSubmit() {

    if (this.isEditMode) {
    const model : IUpdateTeacherAttendance ={
      status: +this.formModel.value.status,
      id : this.selectedId!
    };
    
      this.teacherAttendanceService.updateAttendance(this.selectedId!, model).subscribe({
        next: () => {
          this.getAll();
          this.cancel();
        },
        error: (err) => console.error(err)
      });
    } else {
      const model: ICreateTeacherAttendance = this.formModel.value;
      model.status = +model.status;
      console.log(model);
      console.log(this.formModel.value);
      this.teacherAttendanceService.addAttendance(model).subscribe({
        next: () => {
          this.getAll();
          this.formModel.reset();
        },
        error: (err) => console.error(err)
      });
    }
  }

edit(item: ITeacherAttendance) {
  this.isEditMode = true;
  this.selectedId = item.id;

  this.formModel.patchValue({
    teacherId: item.teacherId,
    halaqaId: item.halaqaId,
    attendanceDate: `${new Date(item.attendanceDate).getFullYear()}-${(new Date(item.attendanceDate).getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${new Date(item.attendanceDate).getDate().toString().padStart(2, '0')}`,

    status: item.status,

  });
}


  delete(id: number) {
    this.teacherAttendanceService.deleteAttendance(id).subscribe(() => this.getAll());
  }

  cancel() {
    this.isEditMode = false;
    this.selectedId = null;
    this.formModel.reset();
  }

  getStatusLabel(status: number): string {
  switch (status) {
    case 0: return 'حاضر';
    case 1: return 'غائب';
    case 2: return 'بعذر';
    default: return 'غير معروف';
  }
}
filterAttendance(){
  if(this.filterHalaqaId != 0 && this.filterTeacherId != 0) {
    this.teacherAttendanceService.getAttendanceByTeacherAndHalaqa(this.filterTeacherId, this.filterHalaqaId).subscribe({
      next: (res) => this.teacherAttendance = res,
      error: (err) => console.error(err)
    });
  }
  else if(this.filterHalaqaId != 0 && this.filterTeacherId == 0) {
    this.teacherAttendanceService.getAttendanceByHalaqaId(this.filterHalaqaId).subscribe({
      next: (res) => this.teacherAttendance = res,
      error: (err) => console.error(err)
    });
  } else if(this.filterTeacherId != 0 && this.filterHalaqaId == 0) {
    this.teacherAttendanceService.getAttendanceByTeacherId(this.filterTeacherId).subscribe({
      next: (res) => this.teacherAttendance = res,
      error: (err) => console.error(err)
    });
  } else if(this.filterHalaqaId == 0 && this.filterTeacherId == 0) {
    this.getAll();
  }else if(this.filterHalaqaId == 0 && this.filterTeacherId != 0) {
    this.teacherAttendanceService.getAttendanceByTeacherId(this.filterTeacherId).subscribe({
      next: (res) => this.teacherAttendance = res,
      error: (err) => console.error(err)
    });
  }
  this.filterHalaqaId = 0;
  this.filterTeacherId = 0;
  this.cancel();
  this.isEditMode = false;
  this.selectedId = null;
  this.formModel.reset();
}

}
