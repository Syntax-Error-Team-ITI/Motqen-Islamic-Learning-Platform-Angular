import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Halaqas } from './pages/halaqas/halaqas';
import { Login } from './pages/login/login';
import { ContactUs } from './pages/contact-us/contact-us';
import { NotFound } from './pages/not-found/not-found';
import { ParentChildren } from './pages/parent/parent-children/parent-children';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'login', component: Login },
  { path: 'halaqas', component: Halaqas },
  { path: 'contact-us', component: ContactUs },
  { path: 'parent-children/:id', component: ParentChildren },
  { path: '**', component: NotFound },
];
