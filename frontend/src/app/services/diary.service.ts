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

  createDiary(event: IDiaryCreate): Observable<IDiaryCreate> {
    return this.http.post<IDiaryCreate>(this.apiUrl, event);
  }

  updateDiary(event: IDiary): Observable<IDiary> {
    return this.http.put<IDiary>(this.apiUrl, event);
  }

}
