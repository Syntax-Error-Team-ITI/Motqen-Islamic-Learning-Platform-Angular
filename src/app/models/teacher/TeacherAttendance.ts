export  interface ITeacherAttendance {
  id: number;
  teacherId: number;
  halaqaId: number;
  teacherName: string;
  halaqaName: string;
  attendanceDate: Date;
  status: number;
}

export interface ICreateTeacherAttendance {
  teacherId: number;
  halaqaId: number;
  attendanceDate: Date;
  status: number;
}
export interface IUpdateTeacherAttendance {
  id: number;
  status: number;
}
