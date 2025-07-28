import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Halaqas } from './pages/halaqas/halaqas';
import { Login } from './pages/Auth/login/login';
import { ContactUs } from './pages/contact-us/contact-us';
import { NotFound } from './pages/not-found/not-found';
import { ParentChildren } from './pages/parent/parent-children/parent-children';
import { HalaqaMeeting } from './pages/halaqa/halaqa-meeting/halaqa-meeting';
import { TeacherReports } from './pages/teacher-reports/teacher-reports';
import { ParentReports } from './pages/parent-reports/parent-reports';
import { DisplayStudentsForHalaqa } from './pages/halaqa/display-students-for-halaqa/display-students-for-halaqa';
import { AdminReports } from './pages/admin-reports/admin-reports';
import { DashboardChatbot } from './pages/chatbot/chatbot';
import { HalaqasEnrolledByStudent } from './dashboards/studentDashboard/halaqas-enrolled-by-student/halaqas-enrolled-by-student';
import { HalaqaList } from './dashboards/adminDashboard/halaqa-list/halaqa-list';
import { ParentList } from './dashboards/adminDashboard/parent-list/parent-list';
import { ProgressTracking } from './dashboards/teacherDashboard/progress-tracking/progress-tracking';
import { ConfirmEmail } from './pages/Auth/confirm-email/confirm-email';
import { StudentRegister } from './pages/Auth/register/student-register/student-register';
import { ParentRegister } from './pages/Auth/register/parent-register/parent-register';
import { HalaqasTeachedByTeacher } from './dashboards/teacherDashboard/halaqas-teached-by-teacher/halaqas-teached-by-teacher';
import { TeacherList } from './dashboards/adminDashboard/teacher-list/teacher-list';
import { StudentAttendance } from './dashboards/adminDashboard/student-attendance/student-attendance';
import { StudentList } from './dashboards/adminDashboard/student-list/student-list';
import { HalaqaDetails } from './dashboards/adminDashboard/halaqa-details/halaqa-details';
import { SubjectList } from './dashboards/adminDashboard/subject-list/subject-list';
import { AddTeacher } from './pages/Auth/register/add-teacher/add-teacher';
import { ForgotPassword } from './pages/Auth/forgot-password/forgot-password';
import { HalaqaTeachers } from './dashboards/adminDashboard/halaqa-teachers/halaqa-teachers';
import { TeacherAttendance } from './dashboards/adminDashboard/teacher-attendance/teacher-attendance';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'login', component: Login },
  { path: 'student-register', component: StudentRegister },
  { path: 'parent-register', component: ParentRegister },
  { path: 'add-teacher', component: AddTeacher },
  { path: 'confirm-email', component: ConfirmEmail },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'halaqas', component: Halaqas },
  { path: 'contact-us', component: ContactUs },
  {
    path: 'parent/:id/children',
    component: ParentChildren,
    canActivate: [RoleGuard],
    data: { roles: ['Parent', 'Admin'] },
  },
  {
    path: 'student/:id/halaqa',
    component: HalaqasEnrolledByStudent,
    canActivate: [RoleGuard],
    data: { roles: ['Student', 'Admin'] },
  },
  {
    path: 'join-halaqa/:liveLink',
    component: HalaqaMeeting,
    canActivate: [RoleGuard],
    data: { roles: ['Student', 'Admin', 'Teacher'] },
  },
  {
    path: 'parent-reports/:studentId',
    component: ParentReports,
    canActivate: [RoleGuard],
    data: { roles: ['Parent', 'Admin'] },
  },
  {
    path: 'teacher-reports/:teacherId',
    component: TeacherReports,
    canActivate: [RoleGuard],
    data: { roles: ['Teacher', 'Admin'] },
  },
  {
    path: 'halaqa/:id/students',
    component: DisplayStudentsForHalaqa,
    canActivate: [RoleGuard],
    data: { roles: ['Teacher', 'Admin'] },
  },
  {
    path: 'halaqa/:id/teachers',
    component: HalaqaTeachers,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'admin-Reports',
    component: AdminReports,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'dashboard/chatbot',
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Teacher', 'Parent', 'Student'] },
    component: DashboardChatbot,
  },
  {
    path: 'dashboard/parent-list',
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
    component: ParentList,
  },
  {
    path: 'dashboard/halaqa-list',
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Teacher', 'Parent', 'Student'] },
    component: HalaqaList,
  },
  {
    path: 'dashboard/subject-list',
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
    component: SubjectList,
  },
  {
    path: 'dashboard/teacher-attendance',
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
    component: TeacherAttendance,
  },
  {
    path: 'dashboard/teacher-list',
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
    component: TeacherList,
  },
  {
    path: 'dashboard/student-attendance',
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Teacher'] },
    component: StudentAttendance,
  },
  {
    path: 'dashboard/student-list',
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
    component: StudentList,
  },
  {
    path: 'dashboard/halaqa-details/:id',
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Teacher', 'Parent', 'Student'] },
    component: HalaqaDetails,
  },

  {
    path: 'progress-tracking/:halaqaId',
    canActivate: [RoleGuard],
    data: { roles: ['Teacher'] },
    component: ProgressTracking,
  },
  {
    path: 'teacher/:teacherId/halaqas',
    canActivate: [RoleGuard],
    data: { roles: ['Teacher', 'Admin'] },
    component: HalaqasTeachedByTeacher,
  },

  { path: '**', component: NotFound },
];
