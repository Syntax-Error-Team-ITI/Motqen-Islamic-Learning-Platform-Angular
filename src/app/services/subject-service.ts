import { ISubject } from './../models/Subject/isubject';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  baseUrl = environment.apiBaseUrl + '/subject';
  constructor(private http: HttpClient) {}

  // Get all subjects
  getAllSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(this.baseUrl);
  }

  // Add new subject
  addSubject(subject: ISubject): Observable<ISubject> {
    return this.http.post<ISubject>(this.baseUrl, subject);
  }

  // Update subject
  updateSubject(id: number, subject: ISubject): Observable<ISubject> {
    return this.http.put<ISubject>(`${this.baseUrl}/${id}`, subject);
  }
}
