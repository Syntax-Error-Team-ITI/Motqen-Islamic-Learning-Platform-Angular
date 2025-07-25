import { Injectable } from '@angular/core';
import { ITeacher } from '../models/teacher/iteacher';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = environment.apiBaseUrl + '/teacher';
  constructor(private http: HttpClient) {}
  getTeachers(): Observable<ITeacher[]> {
    return this.http.get<ITeacher[]>(`${this.apiUrl}`);
  }
}
