import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITimetable, IEventCreate, IEvent } from '../interfaces/timetable';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/assistant/api/events/';

  constructor(private http: HttpClient) { }

  // Получение расписания
  getTimetable(): Observable<ITimetable> {
    return this.http.get<ITimetable>(this.apiUrl);
  }

  // Создание нового события
  createEvent(event: IEventCreate): Observable<IEventCreate> {
    return this.http.post<IEventCreate>(this.apiUrl, event);
  }

  // Обновление события (обновляются только некоторые поля)
  updateEvent(event: IEvent): Observable<IEvent> {
      return this.http.put<IEvent>(this.apiUrl, event);
    }

  // Удаление события
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

}
