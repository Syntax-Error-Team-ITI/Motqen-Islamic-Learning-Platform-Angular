import { QuranSummaryCountersDto } from "./report-dtos";

export interface TeacherQuranSummaryDto {
  halaqaId: number;
  halaqaName: string;
  totalStudents: number;
  totalLinesMemorized: number;
  totalLinesReviewed: number;
  averageLinesPerStudent: number;
}

export interface HalaqaProgressSummaryDto {
  halaqaId: number;
  halaqaName: string;
  subjectName: string;
  studentsCount: number;
  attendanceRate: number;
}

export interface TeacherDashboardDto {
  totalHalaqas: number;
  totalStudents: number;
  overallAttendanceRate: number;
  halaqasProgress: HalaqaProgressSummaryDto[];
}
export interface HalaqaComparisonDto{
  halaqaId : number;
  halaqaName: string;
  totalStudents: number;
  averageLinesPerStudent : number;
  quranProgress : QuranSummaryCountersDto;
}
