import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HalaqaComparisonDto, TeacherDashboardDto, TeacherQuranSummaryDto } from '../models/reports/teacher_reports-dtos';
import { IslamicSubjectsDetailedProgressReportDto, MonthlyWeeklyAttendanceChartDto, QuranProgressChartPointDto, StudentAttendancePieChartDto } from '../models/reports/report-dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Teacher_Reports {
  private baseUrl = 'https://localhost:7103/api/TeacherReports';

    constructor(private http: HttpClient) { }

  getHalaqaMemorizationProgress(halaqaId: number): Observable<QuranProgressChartPointDto[]> {
    return this.http.get<QuranProgressChartPointDto[]>(`${this.baseUrl}/Quran/MemorizationProgress/${halaqaId}`);
  }

  getHalaqaQuranSummary(halaqaId: number): Observable<TeacherQuranSummaryDto> {
    return this.http.get<TeacherQuranSummaryDto>(`${this.baseUrl}/Quran/Summary/${halaqaId}`);
  }

  // 2. تقارير الحضور
  getHalaqaAttendanceTrend(halaqaId: number, periodType: string = 'month'): Observable<MonthlyWeeklyAttendanceChartDto[]> {
    return this.http.get<MonthlyWeeklyAttendanceChartDto[]>(
      `${this.baseUrl}/Attendance/Trend/${halaqaId}?periodType=${periodType}`
    );
  }

  getHalaqaAttendanceSummary(halaqaId: number): Observable<StudentAttendancePieChartDto[]> {
    return this.http.get<StudentAttendancePieChartDto[]>(`${this.baseUrl}/Attendance/Summary/${halaqaId}`);
  }

  // 3. لوحة التحكم
  getTeacherDashboard(teacherId: number): Observable<TeacherDashboardDto> {
    return this.http.get<TeacherDashboardDto>(`${this.baseUrl}/Dashboard/${teacherId}`);
  }

  // 4. تقارير المواد الإسلامية
  getHalaqaIslamicProgress(halaqaId: number): Observable<IslamicSubjectsDetailedProgressReportDto[]> {
    return this.http.get<IslamicSubjectsDetailedProgressReportDto[]>(`${this.baseUrl}/IslamicProgress/${halaqaId}`);
  }
 getHalaqasComparison(halaqaIds: number[]): Observable<HalaqaComparisonDto[]> {
  const params = halaqaIds.map(id => `halaqaIds=${id}`).join('&');
  return this.http.get<HalaqaComparisonDto[]>(`${this.baseUrl}/Comparison?${params}`);
}
}
