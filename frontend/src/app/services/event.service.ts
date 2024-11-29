import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITimetable, INewEvent } from '../interfaces/timetable';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/assistant/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<ITimetable> {
    return this.http.get<ITimetable>(this.apiUrl);
  }

  createEvent(event: INewEvent): Observable<INewEvent> {
    return this.http.post<INewEvent>(this.apiUrl, event);
  }

  updateEvent(event: ITimetable): Observable<ITimetable> {
    return this.http.put<ITimetable>(this.apiUrl, event);
  }

}
