import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrl = environment.apiBaseUrl + '/chat'; // Adjust if your route is different

  constructor(private http: HttpClient) {}

  MessageChatAssistant(userMessage: string): Observable<any> {
    // Send the message as a raw string, with correct headers
    return this.http.post<any>(this.baseUrl, JSON.stringify(userMessage), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json', // Expect a plain string response
    });
  }
}
