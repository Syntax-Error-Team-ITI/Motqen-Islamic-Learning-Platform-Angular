import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  CreateStudentAttendanceDto,
  IProgressForm,
} from '../models/ProgressTracking/iprogress-form';

@Injectable({
  providedIn: 'root',
})
export class ProgressTrackingService {
  baseUrl = environment.apiBaseUrl + '/progressTraking';
  baseUrl2 = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  addProgressTracking(progressForm: IProgressForm): Observable<any> {
    return this.http.post(`${this.baseUrl}`, progressForm);
  }

  addStudentAttendance(
    studentAttendance: CreateStudentAttendanceDto
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl2}/studentAttendance`,
      studentAttendance
    );
  }

  getStudentAttendance(halaqaId: number, date: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl2}/studentAttendance/byHalaqaId/${halaqaId}?attendanceDate=${date}`
    );
  }

  /*
   public class CreateStudentAttendanceDto
 {
     public int StudentId { get; set; }
     public int HalaqaId { get; set; }
     public DateTime AttendanceDate { get; set; }
     public AttendanceStatus Status { get; set; }
 }
  
  */
}
