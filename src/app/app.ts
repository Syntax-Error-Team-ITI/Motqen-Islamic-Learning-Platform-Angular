import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Home } from './pages/home/home';
import { AboutUs } from './pages/about-us/about-us';
import { Login } from './pages/Auth/login/login';
import { Halaqas } from './pages/halaqas/halaqas';
import { Chatbot } from './layout/chatbot/chatbot';
import { Footer } from './layout/footer/footer';
// import { AdminDashboard } from './dashboards/admin-dashboard/admin-dashboard';
import { Aside } from './layout/aside/aside';
import { AuthService } from './services/auth-service';
import { JwtService } from './services/jwt-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Aside, Chatbot, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'متقن';
  isLoggedIn: boolean = false ;
  private loginSub?: Subscription;
  constructor(private authService: AuthService, private cdr :ChangeDetectorRef) {}
  ngOnInit(): void {
    this.loginSub = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      // this.cdr.detectChanges()
    });
  }
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }
}
