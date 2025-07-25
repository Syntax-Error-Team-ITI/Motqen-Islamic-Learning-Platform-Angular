import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { IHalaqaTeacher } from '../models/teacher/halaqa_teacher/ihalaqa-teacher';
import { IHalaqaNamesList } from '../models/Halaqaa/ihalaqa-names-list';

@Injectable({
  providedIn: 'root',
})
export class HalaqaTeacherService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getHalaqaTeachers(): Observable<IHalaqaTeacher[]> {
    return this.http.get<IHalaqaTeacher[]>(`${this.apiUrl}/halaqaTeacher`);
  }
  GetHalaqasNotAssignToTeacher(
    teacherId: number
  ): Observable<IHalaqaNamesList[]> {
    return this.http.get<IHalaqaNamesList[]>(
      `${this.apiUrl}/halaqaTeacher/halaqaNotAssignForTeacher/${teacherId}`
    );
  }
  getHalaqaTeacherById(teacherId: number): Observable<IHalaqaTeacher> {
    return this.http.get<IHalaqaTeacher>(
      `${this.apiUrl}/halaqaTeacher/teacher/${teacherId}`
    );
  }
  getHalaqaTeacherByTeacherId(teacherId: number): Observable<IHalaqaTeacher[]> {
    return this.http.get<IHalaqaTeacher[]>(
      `${this.apiUrl}/halaqaTeacher/teacher/${teacherId}`
    );
  }
  getHalaqaTeacherByHalaqaId(halaqaId: number): Observable<IHalaqaTeacher[]> {
    return this.http.get<IHalaqaTeacher[]>(
      `${this.apiUrl}/halaqaTeacher/halaqa/${halaqaId}`
    );
  }
  getHalaqaTeacherByTeacherIdAndHalaqaId(
    teacherId: number,
    halaqaId: number
  ): Observable<IHalaqaTeacher> {
    return this.http.get<IHalaqaTeacher>(
      `${this.apiUrl}/halaqaTeacher/teacher/${teacherId}/halaqa/${halaqaId}`
    );
  }
  createHalaqaTeacher(
    halaqaId: number,
    teacherId: number
  ): Observable<IHalaqaTeacher> {
    return this.http.post<IHalaqaTeacher>(`${this.apiUrl}/halaqaTeacher`, {
      halaqaId,
      teacherId,
    });
  }
  deleteHalaqaTeacher(halaqaId: number, teacherId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/halaqaTeacher/teacher/${teacherId}/halaqa/${halaqaId}`
    );
  }
}
