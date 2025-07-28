import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateTeacherAttendance, ITeacherAttendance, IUpdateTeacherAttendance } from '../models/teacher/TeacherAttendance';

@Injectable({
  providedIn: 'root'
})
export class TeacherAttendanceService {
  private apiUrl = environment.apiBaseUrl + '/TeacherAttendance';
  constructor(private http: HttpClient) {}
  getAllAttendance(): Observable<ITeacherAttendance[]> {
    return this.http.get<ITeacherAttendance[]>(`${this.apiUrl}`);
  }
  getAttendanceById(id: number): Observable<ITeacherAttendance> {
    return this.http.get<ITeacherAttendance>(`${this.apiUrl}/${id}`);
  }
  getAttendanceByTeacherId(teacherId: number): Observable<ITeacherAttendance[]> {
    return this.http.get<ITeacherAttendance[]>(`${this.apiUrl}/byTeacherId/${teacherId}`);
  }
  getAttendanceByHalaqaId(halaqaId: number): Observable<ITeacherAttendance[]> {
    return this.http.get<ITeacherAttendance[]>(`${this.apiUrl}/byHalaqaId/${halaqaId}`);
  }
  getAttendanceByTeacherAndHalaqa(teacherId: number, halaqaId: number): Observable<ITeacherAttendance[]> {
    return this.http.get<ITeacherAttendance[]>(`${this.apiUrl}/byComposite/${teacherId}/${halaqaId}`);
  }
  addAttendance(attendance: ICreateTeacherAttendance): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, attendance);
  }
  updateAttendance(id: number , attendance:IUpdateTeacherAttendance ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${attendance.id}`, attendance);
  }
  deleteAttendance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
