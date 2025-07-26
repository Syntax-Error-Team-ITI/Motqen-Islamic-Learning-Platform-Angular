import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentRegisterDTO, ParentRegisterDTO } from '../models/User/user-register-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  registerStudent(studentData: StudentRegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-student`, studentData);
  }

  registerParent(parentData: ParentRegisterDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-parent`, parentData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  confirmEmail(userId: string, token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/confirm-email?userId=${userId}&token=${token}`);
  }

  resendConfirmationEmail(userId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resend-confirmation-email`, userId);
  }

  // continueRegister(userdata: any) {
  //   console.log("sending: ", { userdata });
  //   return this.http.post<any>(`${this.baseUrl}/continue-registration`, userdata);
  // }

  // signup and login with google


  // forgot and password



}
