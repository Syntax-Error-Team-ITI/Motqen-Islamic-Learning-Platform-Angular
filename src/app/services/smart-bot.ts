import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { SmartQueryRequest, SmartQueryResponse } from '../models/smart-query';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class SmartBot {
  baseUrl = environment.apiBaseUrl + '/smartquery';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Ask a question to the smart query system
   * @param request - The smart query request containing question and optional user info
   * @returns Observable of SmartQueryResponse
   */
  ask(request: SmartQueryRequest): Observable<SmartQueryResponse> {
    return this.http.post<SmartQueryResponse>(`${this.baseUrl}/ask`, request, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getAccessToken()}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Ask a simple question (string only)
   * @param question - The question as a string
   * @returns Observable of string response
   */
  askSimple(question: string): Observable<string> {
    return this.http.post<string>(
      `${this.baseUrl}/ask-simple`,
      JSON.stringify(question),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
      }
    );
  }

  /**
   * Test endpoint without authorization (for debugging)
   * @param request - The smart query request
   * @returns Observable of SmartQueryResponse
   */
  askTest(request: SmartQueryRequest): Observable<SmartQueryResponse> {
    return this.http.post<SmartQueryResponse>(
      `${this.baseUrl}/ask-test`,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  /**
   * Debug token information (for troubleshooting)
   * @returns Observable of token debug information
   */
  debugToken(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/debug-token`);
  }
}
