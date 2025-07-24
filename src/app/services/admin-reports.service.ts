import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdminDashboardSummary, IHalaqaHealthReport, IStudentPerformanceOverview, ITeacherPerformance, IUserSummary } from '../models/reports/admin-reports-dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminReportsService {
  private baseUrl = 'https://localhost:7103/api/AdminReports';
  constructor(private http :HttpClient){}
  getUserSummary(): Observable<IUserSummary[]> {
    return this.http.get<IUserSummary[]>(`${this.baseUrl}/user-summary`);
  }
  getDashboardSummary():Observable<IAdminDashboardSummary>{
    return this.http.get<IAdminDashboardSummary>(`${this.baseUrl}/dashboard-summary`)
  }
    getTeacherPerformance():Observable<ITeacherPerformance[]>{
    return this.http.get<ITeacherPerformance[]>(`${this.baseUrl}/teacher-performance`)
  }
    getStudentPerformance():Observable<IStudentPerformanceOverview[]>{
    return this.http.get<IStudentPerformanceOverview[]>(`${this.baseUrl}/student-performance`)
  }
    getHalaqaHealth():Observable<IHalaqaHealthReport[]>{
    return this.http.get<IHalaqaHealthReport[]>(`${this.baseUrl}/halaqa-health`)
  }
}
