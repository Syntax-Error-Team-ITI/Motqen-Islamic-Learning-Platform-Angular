  export interface IUserSummary
  {
      userId: number;
      fullName: string;
      email: string;
      role: string;
      isActive: boolean;
  }
  export interface IAdminDashboardSummary{
      totalUsers: number;
      totalTeachers: number;
      totalStudents: number;
      totalHalaqas: number;
      overallAttendanceRate: number;
      newjoinToHalaqaThisMonth: number;
  }

  export interface IHalaqaHealthReport{

      halaqaId: number;
      halaqaName: string;
      studentCount: number;
      teacherCount: number;
      averageAttendanceRate: number;
      averageProgress: number;
  }

  export interface IStudentPerformanceOverview{
      studentId: number;
      studentName: string;
      email: string;
      attendanceRate: number;
      totalQuranLinesMemorized: number;
      totalQuranLinesReviewed: number;
      totalIslamicPagesCompleted: number;
  }

  export interface ITeacherPerformance{
      teacherId: number;
      teacherName: string;
      email: string;
      totalAssignedHalaqas: number;
      averageAttendanceRate: number;
      averageStudentProgress: number;
  }
