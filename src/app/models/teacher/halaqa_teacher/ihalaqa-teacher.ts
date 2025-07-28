export interface IHalaqaTeacher {
  halaqaId: number;
  teacherId: number;
  teacherName: string;
  halaqaName: string;
  subjectName: string;
  genderGroup: string;
  liveCode: string;
}
export interface ICreateHalaqaTeacher {
  halaqaId: number;
  teacherId: number;
}
