import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StudentRegisterDTO, ParentRegisterDTO, AddTeacherDTO, UserResetPasswordDTO } from '../models/User/user-register-dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiBaseUrl}/auth`;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // On service creation, check if a token exists and update loggedIn state
    if (this.getAccessToken()) {
      this.loggedIn.next(true);
    }
  }

  registerStudent(studentData: StudentRegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-student`, studentData);
  }

  registerParent(parentData: ParentRegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-parent`, parentData);
  }

  addTeacher(teacherData: AddTeacherDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-teacher`, teacherData);
  }

  login(email: string, password: string): Observable<any> {
    if (this.getAccessToken())
      return throwError(() => new Error('User is already logged in'));

    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  confirmEmail(userId: string, token: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/confirm-email?userId=${userId}&token=${token}`
    );
  }

  resendConfirmationEmail(email: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/resend-confirmation-email?email=${email}`
    );
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return (
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken')
    );
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

  forgotPassword(email: string) {
    return this.http.get(`${this.baseUrl}/forgot-password?email=${email}`);
  }

  changePassword(resetPasswordData: UserResetPasswordDTO) {
    return this.http.post<any>(`${this.baseUrl}/forgot-password/reset-password`, resetPasswordData);
  }

  // signup and login with google


  public notifyLogin() {
    this.loggedIn.next(true);
  }

  public notifyLogout() {
    this.loggedIn.next(false);
  }

  public isLoggedIn$ = this.loggedIn.asObservable();

}
