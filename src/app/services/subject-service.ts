import { ISubject } from './../models/Subject/isubject';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubjectForm } from '../models/Subject/i-subject-form';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  baseUrl = environment.apiBaseUrl + '/subject';
  constructor(private http: HttpClient) {}

  // Get all subjects
  getAllSubjects(includeDelete: boolean = false): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(
      `${this.baseUrl}?includeDelete=${includeDelete}`
    );
  }

  // Get subject by id
  getSubjectById(id: number): Observable<ISubject> {
    return this.http.get<ISubject>(`${this.baseUrl}/${id}`);
  }

  // Get deleted subjects
  getDeletedSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(`${this.baseUrl}/deleted`);
  }

  // Add new subject
  addSubject(subject: ISubjectForm): Observable<ISubject> {
    return this.http.post<ISubject>(this.baseUrl, subject);
  }

  // Update subject
  updateSubject(id: number, subject: ISubjectForm): Observable<ISubject> {
    return this.http.put<ISubject>(`${this.baseUrl}/${id}`, subject);
  }

  // Delete subject
  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Restore subject
  restoreSubject(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/restore/${id}`, {});
  }
}
