import { Injectable } from '@angular/core';
import { IStudentShortDisplay } from '../models/student/istudent-short-display';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudentHalaqaDisplay } from '../models/student/istudent-halaqa-display';
import { IStudentHalaqaForm } from '../models/student/istudent-halaqa-form';
import { IHalaqaStudentDisplayHalaqa } from '../models/student/ihalaqa-student-display-halaqa';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getAllStudents(
    includeDeleted: boolean = false
  ): Observable<IStudentShortDisplay[]> {
    return this.http.get<IStudentShortDisplay[]>(
      `${this.baseUrl}/student?includeDeleted=${includeDeleted}`
    );
  }

  getStudentById(
    studentId: number,
    includeDeleted: boolean = false
  ): Observable<IStudentShortDisplay> {
    return this.http.get<IStudentShortDisplay>(
      `${this.baseUrl}/student/${studentId}?includeDeleted=${includeDeleted}`
    );
  }

  getAllStudentsForHalaqa(
    halaqaId: number,
    includeDeleted: boolean = false
  ): Observable<IStudentHalaqaDisplay[]> {
    return this.http.get<IStudentHalaqaDisplay[]>(
      `${this.baseUrl}/student/halaqa/${halaqaId}/all-students?includeDeleted=${includeDeleted}`
    );
  }

  getAllHalaqaForStudent(
    studentId: number,
    includeDeleted: boolean = false
  ): Observable<IHalaqaStudentDisplayHalaqa[]> {
    return this.http.get<IHalaqaStudentDisplayHalaqa[]>(
      `${this.baseUrl}/student/${studentId}/all-halaqa?includeDeleted=${includeDeleted}`
    );
  }

  deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/student/${studentId}`);
  }

  restoreStudent(studentId: number): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/student/restore/${studentId}`,
      {}
    );
  }

  addStudentToHalaqa(studentHalaqaForm: IStudentHalaqaForm): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/halaqaStudent`,
      studentHalaqaForm
    );
  }

  removeStudentFromHalaqa(
    studentId: number,
    halaqaId: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/halaqaStudent/${studentId}/${halaqaId}`
    );
  }
}
