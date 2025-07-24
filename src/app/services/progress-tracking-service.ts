import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProgressForm } from '../models/ProgressTracking/iprogress-form';

@Injectable({
  providedIn: 'root',
})
export class ProgressTrackingService {
  baseUrl = environment.apiBaseUrl + '/progressTraking';
  constructor(private http: HttpClient) {}
  addProgressTracking(progressForm: IProgressForm): Observable<any> {
    return this.http.post(`${this.baseUrl}`, progressForm);
  }
}
