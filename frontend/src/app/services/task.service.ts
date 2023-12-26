// src/app/task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITaskPage } from '../interfaces/task-page';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/assistant/api/tasks';

  constructor(private http: HttpClient) {}

  addTask(taskData: ITaskPage): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }
}
