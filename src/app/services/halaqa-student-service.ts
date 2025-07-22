import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { IStudentHalaqaForm } from '../models/student/istudent-halaqa-form';

@Injectable({
  providedIn: 'root'
})
export class HalaqaStudentService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  assignStudentToHalaqa(studentHalaqaForm: IStudentHalaqaForm) {
    return this.http.post(`${this.baseUrl}/halaqastudent`, studentHalaqaForm);
  }
  removeStudentFromHalaqa(studentId: number, halaqaId: number) {
    return this.http.delete(`${this.baseUrl}/halaqastudent?studentId=${studentId}&halaqaId=${halaqaId}`);
  }

}
