import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Halaqas } from './pages/halaqas/halaqas';
import { Login } from './pages/login/login';
import { ContactUs } from './pages/contact-us/contact-us';
import { NotFound } from './pages/not-found/not-found';
import { ParentChildren } from './pages/parent/parent-children/parent-children';
import { DisplayHalaqaForStudent } from './pages/student/display-halaqa-for-student/display-halaqa-for-student';
import { HalaqaMeeting } from './pages/halaqa/halaqa-meeting/halaqa-meeting';
import { TeacherReports } from './pages/teacher-reports/teacher-reports';
import { ParentReports } from './pages/parent-reports/parent-reports';
import { DisplayStudentsForHalaqa } from './pages/halaqa/display-students-for-halaqa/display-students-for-halaqa';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'halaqas', component: Halaqas },
  { path: 'contact-us', component: ContactUs },
  { path: 'parent-children/:id', component: ParentChildren },
  { path: 'student/:id/halaqa', component: DisplayHalaqaForStudent },
  { path: 'join-halaqa/:liveLink', component: HalaqaMeeting },
  { path: 'parent-reports/:studentId', component: ParentReports },
  { path: 'teacher-reports/:teacherId', component: TeacherReports },
  { path: 'halaqa/:id/students', component: DisplayStudentsForHalaqa },

  { path: '**', component: NotFound },
];
