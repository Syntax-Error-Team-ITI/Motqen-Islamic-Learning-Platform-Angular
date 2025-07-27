import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { JwtService } from '../../services/jwt-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-aside',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside implements OnInit {
  user: any;
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtService.getDecodedAccessToken();
  }
  logout() {
    this.authService.logout();
    this.authService.notifyLogout();
    this.router.navigate(['/home']);
    // Navigation is handled by AuthService.logout()
  }
}
