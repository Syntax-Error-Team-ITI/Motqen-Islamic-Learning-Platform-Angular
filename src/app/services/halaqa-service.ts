import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { IHalaqaDto } from '../models/Halaqaa/ihalaqa-dto';
import { Observable } from 'rxjs';
import { IHalaqaNamesList } from '../models/Halaqaa/ihalaqa-names-list';
import { IHalaqaDetailsDto } from '../models/Halaqaa/ihalaqa-details-dto';
import { IHalaqaForm } from '../models/Halaqaa/ihalaqa-form';
import { IClassSchedule } from '../models/Halaqaa/iclass-schedule';
import { IclassScheduleForm } from '../models/Halaqaa/iclass-schedule-form';

@Injectable({
  providedIn: 'root',
})
export class HalaqaService {
  baseUrl = environment.apiBaseUrl + '/halaqa';
  constructor(private http: HttpClient) {}

  // Add methods to interact with halaqa data here
  getHalaqaList(includeDeleted: boolean = false): Observable<IHalaqaDto[]> {
    return this.http.get<IHalaqaDto[]>(
      `${this.baseUrl}?includeDeleted=${includeDeleted}`
    );
  }
  getHalaqaNamesList(): Observable<IHalaqaNamesList[]> {
    return this.http.get<IHalaqaNamesList[]>(`${this.baseUrl}/names`);
  }
  getHalaqaById(id: number): Observable<IHalaqaDetailsDto> {
    return this.http.get<IHalaqaDetailsDto>(`${this.baseUrl}/${id}`);
  }

  // Add new halaqa
  addHalaqa(halaqa: IHalaqaForm): Observable<IHalaqaDto> {
    return this.http.post<IHalaqaDto>(this.baseUrl, halaqa);
  }

  // Update halaqa
  updateHalaqa(id: number, halaqa: IHalaqaForm): Observable<IHalaqaDto> {
    return this.http.put<IHalaqaDto>(`${this.baseUrl}/${id}`, halaqa);
  }

  // Delete halaqa
  deleteHalaqa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Restore a deleted halaqa
  restoreHalaqa(id: number): Observable<IHalaqaDto> {
    return this.http.put<IHalaqaDto>(`${this.baseUrl}/restore/${id}`, {});
  }

  // Filter halaqas by subject
  filterHalaqasBySubject(subjectId: number): Observable<IHalaqaDto[]> {
    return this.http.get<IHalaqaDto[]>(`${this.baseUrl}/subject/${subjectId}`);
  }

  // Get all class schedules for a halaqa
  getClassSchedules(halaqaId: number): Observable<IClassSchedule[]> {
    return this.http.get<IClassSchedule[]>(
      `${this.baseUrl}/${halaqaId}/classschedule`
    );
  }

  // Get a single class schedule for a halaqa
  getClassScheduleById(
    halaqaId: number,
    scheduleId: number
  ): Observable<IClassSchedule> {
    return this.http.get<IClassSchedule>(
      `${this.baseUrl}/${halaqaId}/classschedule/${scheduleId}`
    );
  }

  // Add a class schedule to a halaqa
  addClassSchedule(
    halaqaId: number,
    schedule: IclassScheduleForm
  ): Observable<IClassSchedule> {
    return this.http.post<IClassSchedule>(
      `${this.baseUrl}/${halaqaId}/classschedule`,
      schedule
    );
  }

  // Update a class schedule for a halaqa
  updateClassSchedule(
    halaqaId: number,
    scheduleId: number,
    schedule: IclassScheduleForm
  ): Observable<IClassSchedule> {
    return this.http.put<IClassSchedule>(
      `${this.baseUrl}/${halaqaId}/classschedule/${scheduleId}`,
      schedule
    );
  }

  // Delete a class schedule from a halaqa
  deleteClassSchedule(halaqaId: number, scheduleId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${halaqaId}/classschedule/${scheduleId}`
    );
  }

  // Restore a deleted class schedule for a halaqa
  restoreClassSchedule(
    halaqaId: number,
    scheduleId: number
  ): Observable<IClassSchedule> {
    return this.http.patch<IClassSchedule>(
      `${this.baseUrl}/${halaqaId}/classschedule/restore/${scheduleId}`,
      {}
    );
  }
}
