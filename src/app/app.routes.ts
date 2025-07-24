import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Halaqas } from './pages/halaqas/halaqas';
import { Login } from './pages/login/login';
import { ContactUs } from './pages/contact-us/contact-us';
import { NotFound } from './pages/not-found/not-found';
import { ParentChildren } from './pages/parent/parent-children/parent-children';
import { HalaqaMeeting } from './pages/halaqa/halaqa-meeting/halaqa-meeting';
import { TeacherReports } from './pages/teacher-reports/teacher-reports';
import { ParentReports } from './pages/parent-reports/parent-reports';
import { DisplayStudentsForHalaqa } from './pages/halaqa/display-students-for-halaqa/display-students-for-halaqa';
import { MainPage } from './dashboards/adminDashboard/main-page/main-page';
import { DashboardChatbot } from './pages/chatbot/chatbot';
import { HalaqasEnrolledByStudent } from './dashboards/studentDashboard/halaqas-enrolled-by-student/halaqas-enrolled-by-student';
import { HalaqaList } from './dashboards/adminDashboard/halaqa-list/halaqa-list';
import { ParentList } from './dashboards/adminDashboard/parent-list/parent-list';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'login', component: Login },
  { path: 'halaqas', component: Halaqas },
  { path: 'contact-us', component: ContactUs },
  { path: 'parent/:id/children', component: ParentChildren },
  { path: 'student/:id/halaqa', component: HalaqasEnrolledByStudent },
  { path: 'join-halaqa/:liveLink', component: HalaqaMeeting },
  { path: 'parent-reports/:studentId', component: ParentReports },
  { path: 'teacher-reports/:teacherId', component: TeacherReports },
  { path: 'halaqa/:id/students', component: DisplayStudentsForHalaqa },
  { path: 'dashboard/home', component: MainPage },
  { path: 'dashboard', redirectTo: 'dashboard/home', pathMatch: 'full' },
  { path: 'dashboard/chatbot', component: DashboardChatbot },
  { path: 'dashboard/parent-list', component: ParentList },
  { path: 'halaqa-list', component: HalaqaList },

  { path: '**', component: NotFound },
];
