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

  createNote(note: INoteForCreate): Observable<INote> {
    return this.http.post<INote>(this.apiUrl, note);
  }

  updateNote(note: INote): Observable<INote> {
    return this.http.put<INote>(this.apiUrl, note);
  }

}