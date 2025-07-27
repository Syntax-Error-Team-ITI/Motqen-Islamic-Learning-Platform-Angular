import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  private getToken(): string | null {
    return (
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken')
    );
  }

  getDecodedAccessToken(): any {
    try {
      const token = this.getToken();
      if (token) {
        return jwtDecode(token);
      }
      return null;
    } catch (Error) {
      return null;
    }
  }
}
