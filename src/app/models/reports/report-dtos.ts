// DTOs for Attendance Summary
export interface StudentAttendanceReportDto {
  studentName: string;
  halaqaName: string;
  attendanceDate: Date; // Note: Date will be a string from API, but we can treat it as Date in TS
  attendanceStatus: string;
}
export interface StudentAttendanceDetailsDto {
  attendanceDate :Date
  status: string;
  subject: string;
  halaqa: string;
}

export interface StudentAttendancePieChartDto {
  status: string;
  count: number;
  percentage: number;
  halaqaName: string;
  halaqaId: number;
}

export interface MonthlyWeeklyAttendanceChartDto {
  period: string; // e.g., "January", "Week 1"
  presentCount: number;
  absentCount: number;
  excusedCount: number;
}

export interface StudentHalaqaComparisonReportDto {
  metric: string; // e.g., "Average Memorized Lines", "Attendance Percentage"
  studentValue: number;
  halaqaAverageValue: number;
  studentId: number;
  halaqaId: number;
  studentName: string;
}

// DTOs for Quran Progress
export interface QuranProgressChartPointDto {
  date: Date; // Note: Date will be a string from API, but we can treat it as Date in TS
  numberOfLines: number;
  type: string; // "Memorization" or "Review"
}

export interface WeeklyMonthlyQuranProgressDto {
  period: string; // e.g., "Week 1", "January", "2024-W01", "2024-01"
  totalMemorizedLines: number;
  totalReviewedLines: number;
  halaqaId : number;
  halaqaName: string;
}

export interface QuranSummaryCountersDto {
  totalSurahsMemorized: number;
  totalJuzsMemorized: number;
  totalSurahsReviewed: number;
  totalJuzsReviewed: number;
  totalLinesMemorized: number;
  totalLinesReviewed: number;
}

export interface QuranDetailedProgressReportDto {
  date: Date;
  fromSurahNumber: number;
  toSurahNumber: number;
  fromAyah: number;
  toAyah: number;
  numberOfLines: number;
  type: string;
  status: string;
  evaluation: string;
  notes: string;
}

// DTOs for Islamic Subjects Progress
export interface IslamicSubjectProgressChartDto {
  subjectName: string;
  totalPagesCompleted: number;
}

export interface IslamicSubjectProgressOverTimeChartDto {
  date: Date;
  pagesOrLessonsCompleted: number;
  subjectName: string;
}

export interface IslamicSubjectsDetailedProgressReportDto {
  date: Date;
  subject: string;
  lessonName: string;
  fromPage: number;
  toPage: number;
  status: string;
  evaluation: string;
  notes: string;
  studentName: string;
}
