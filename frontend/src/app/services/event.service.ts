import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITimetable, IEventCreate, IEvent } from '../interfaces/timetable';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/assistant/api/events';

  constructor(private http: HttpClient) { }

  getTimetable(): Observable<ITimetable> {
    return this.http.get<ITimetable>(this.apiUrl);
  }

  createEvent(event: IEventCreate): Observable<IEvent> {
    return this.http.post<IEvent>(this.apiUrl, event);
  }

  updateEvent(event: ITimetable): Observable<ITimetable> {
    return this.http.put<ITimetable>(this.apiUrl, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

}
