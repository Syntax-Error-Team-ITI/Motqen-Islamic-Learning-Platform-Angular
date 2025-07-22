import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { IHalaqaDto } from '../models/Halaqaa/ihalaqa-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HalaqaService {
  baseUrl = environment.apiBaseUrl + '/halaqa';
  constructor(private http: HttpClient) {}

  // Add methods to interact with halaqa data here
  getHalaqaList(): Observable<IHalaqaDto[]> {
    return this.http.get<IHalaqaDto[]>(`${this.baseUrl}`);
  }
}
