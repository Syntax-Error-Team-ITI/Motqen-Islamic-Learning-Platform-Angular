import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  StudentAttendanceReportDto,
  StudentAttendancePieChartDto,
  MonthlyWeeklyAttendanceChartDto,
  StudentHalaqaComparisonReportDto,
  QuranProgressChartPointDto,
  WeeklyMonthlyQuranProgressDto,
  QuranSummaryCountersDto,
  QuranDetailedProgressReportDto,
  IslamicSubjectProgressChartDto,
  IslamicSubjectProgressOverTimeChartDto,
  IslamicSubjectsDetailedProgressReportDto,
  StudentAttendanceDetailsDto
} from '../models/reports/report-dtos';

@Injectable({
  providedIn: 'root'
})
export class ParentReportsService {
  private baseUrl = 'https://localhost:7103/api/ParentReports';

  constructor(private http: HttpClient) { }

  // Student Attendance Reports
  getStudentAttendanceReport(studentId: number): Observable<StudentAttendanceReportDto[]> {
    return this.http.get<StudentAttendanceReportDto[]>(`${this.baseUrl}/StudentAttendanceReport/${studentId}`);
  }
  getStudentAttendanceDetails(studentId : number): Observable<StudentAttendanceDetailsDto[]> {
    return this.http.get<StudentAttendanceDetailsDto[]>(`${this.baseUrl}/Attendance/datails/${studentId}`);
  }

  getStudentAttendanceSummaryPieChart(studentId: number): Observable<StudentAttendancePieChartDto[]> {
    return this.http.get<StudentAttendancePieChartDto[]>(`${this.baseUrl}/Attendance/SummaryPieChart/${studentId}`);
  }

  getStudentMonthlyWeeklyAttendanceChart(studentId: number, periodType: string): Observable<MonthlyWeeklyAttendanceChartDto[]> {
    return this.http.get<MonthlyWeeklyAttendanceChartDto[]>(`${this.baseUrl}/Attendance/MonthlyWeeklyChart/${studentId}?periodType=${periodType}`);
  }

getStudentAttendanceBarChartData(studentId: number): Observable<MonthlyWeeklyAttendanceChartDto[]> {
  return this.http.get<MonthlyWeeklyAttendanceChartDto[]>(`${this.baseUrl}/Attendance/BarChart/${studentId}`);
}

  // Quran Progress Reports
  getStudentMemorizationProgressChart(studentId: number): Observable<QuranProgressChartPointDto[]> {
    return this.http.get<QuranProgressChartPointDto[]>(`${this.baseUrl}/Quran/MemorizationChart/${studentId}`);
  }

  getStudentReviewProgressChart(studentId: number): Observable<QuranProgressChartPointDto[]> {
    return this.http.get<QuranProgressChartPointDto[]>(`${this.baseUrl}/Quran/ReviewChart/${studentId}`);
  }

  getStudentWeeklyMonthlyQuranProgress(studentId: number, periodType: string): Observable<WeeklyMonthlyQuranProgressDto[]> {
    return this.http.get<WeeklyMonthlyQuranProgressDto[]>(`${this.baseUrl}/Quran/WeeklyMonthlyProgress/${studentId}?periodType=${periodType}`);
  }

  getStudentQuranSummaryCounters(studentId: number): Observable<QuranSummaryCountersDto> {
    return this.http.get<QuranSummaryCountersDto>(`${this.baseUrl}/Quran/SummaryCounters/${studentId}`);
  }

  getStudentQuranDetailedProgressReport(studentId: number): Observable<QuranDetailedProgressReportDto[]> {
    return this.http.get<QuranDetailedProgressReportDto[]>(`${this.baseUrl}/Quran/DetailedProgressReport/${studentId}`);
  }

  // Islamic Subjects Progress Reports
  getStudentIslamicSubjectPagesChart(studentId: number): Observable<IslamicSubjectProgressChartDto[]> {
    return this.http.get<IslamicSubjectProgressChartDto[]>(`${this.baseUrl}/IslamicSubjects/PagesChart/${studentId}`);
  }

  getStudentIslamicSubjectProgressOverTimeChart(studentId: number, subjectName: string): Observable<IslamicSubjectProgressOverTimeChartDto[]> {
    return this.http.get<IslamicSubjectProgressOverTimeChartDto[]>(`${this.baseUrl}/IslamicSubjects/ProgressOverTimeChart/${studentId}/${subjectName}`);
  }


  getStudentIslamicSubjectsDetailedProgressReport(studentId: number): Observable<IslamicSubjectsDetailedProgressReportDto[]> {
    return this.http.get<IslamicSubjectsDetailedProgressReportDto[]>(`${this.baseUrl}/IslamicSubjects/DetailedProgressReport/${studentId}`);
  }

  // Student Performance Comparison Report
  getStudentPerformanceComparisonReport(studentId: number, halaqaId: number): Observable<StudentHalaqaComparisonReportDto[]> {
    return this.http.get<StudentHalaqaComparisonReportDto[]>(`${this.baseUrl}/Performance/Comparison/${studentId}/${halaqaId}`);
  }
}
