import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITimetable } from '../interfaces/timetable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private apiUrl = 'http://localhost:8080/assistant/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<ITimetable> {
    return this.http.get<ITimetable>(this.apiUrl);
  }
}
