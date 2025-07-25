export interface StudentAttendanceReportDto {
  studentName: string;
  halaqaName: string;
  attendanceDate: Date;
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
  period: string; 
  presentCount: number;
  absentCount: number;
  excusedCount: number;
}

export interface StudentHalaqaComparisonReportDto {
  metric: string;
  studentValue: number;
  halaqaAverageValue: number;
  studentId: number;
  halaqaId: number;
  studentName: string;
}

export interface QuranProgressChartPointDto {
  date: Date;
  numberOfLines: number;
  type: string;
}

export interface WeeklyMonthlyQuranProgressDto {
  period: string;
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
