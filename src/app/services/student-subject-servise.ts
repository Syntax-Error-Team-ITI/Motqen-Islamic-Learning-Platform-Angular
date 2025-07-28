import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { IStudentSubject } from '../models/student/Istudent-subject';

@Injectable({
  providedIn: 'root'
})
export class StudentSubjectServise {
    baseUrl = environment.apiBaseUrl + '/StudentSubject';
  constructor(private http : HttpClient){}
  // Get all subjects for a student
  getSubjectsByStudentId(studentId: number): Observable<IStudentSubject> {
    return this.http.get<IStudentSubject>(`${this.baseUrl}/byStudentId/${studentId}`);
  }
}
