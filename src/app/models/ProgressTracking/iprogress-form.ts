export interface IProgressForm {
  studentId: number;
  halaqaId: number;
  date: Date;
  status: string;
  notes: string;
  evaluation: string;
  isQuranTracking: boolean;

  // QuranProgressTracking
  type: number | null;
  fromSurah: number | null;
  toSurah: number | null;
  fromAyah: number | null;
  toAyah: number | null;
  numberOfLines: number | null;

  // IslamicSubjectsProgressTracking
  fromPage: number | null;
  toPage: number | null;
  subject: string | null;
  lessonName: string | null;
  progressTrackingId: number | null;
}

export interface CreateStudentAttendanceDto {
  studentId: number;
  halaqaId: number;
  attendanceDate: string; // ISO string
  status: number;
}
