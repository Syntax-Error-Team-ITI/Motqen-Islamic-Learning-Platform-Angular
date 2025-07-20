import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IParentList } from '../models/parent/iparent-list';
import { environment } from '../environment/environment';
import { IParentChildren } from '../models/parent/iparent-children';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getParents(): Observable<IParentList[]> {
    return this.http.get<IParentList[]>(`${this.baseUrl}/parent`);
  }

  getParentById(parentId: number): Observable<IParentList> {
    return this.http.get<IParentList>(`${this.baseUrl}/parent/${parentId}`);
  }

  getParentChildren(parentId: number): Observable<IParentChildren[]> {
    return this.http.get<IParentChildren[]>(
      `${this.baseUrl}/parent/${parentId}/children`
    );
  }
}
