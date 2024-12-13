import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiary, IDiaryCreate } from '../interfaces/diary';


@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private apiUrl = 'http://localhost:8080/assistant/api/diary';

  constructor(private http: HttpClient) { }

  getDiary(): Observable<IDiary[]> {
    return this.http.get<IDiary[]>(this.apiUrl);
  }

  createDiary(diary: IDiaryCreate): Observable<IDiary> {
    return this.http.post<IDiary>(this.apiUrl, diary);
  }

  updateDiary(diary: IDiary): Observable<IDiary> {
    return this.http.put<IDiary>(this.apiUrl, diary);
  }

}
