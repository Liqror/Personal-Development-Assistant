import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote, INoteForCreate } from '../interfaces/note';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:8080/assistant/api/notes';

  constructor(private http: HttpClient) { }

  createNote(event: INoteForCreate): Observable<INote> {
    return this.http.post<INote>(this.apiUrl, event);
  }

  updateNote(event: INote): Observable<INote> {
    return this.http.put<INote>(this.apiUrl, event);
  }

}