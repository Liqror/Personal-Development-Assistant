// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITaskCreate, ITask } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private apiUrl = 'http://localhost:8080/assistant/api/tasks';

  constructor(private http: HttpClient) {}

  // Добавление задачи
  addTask(taskData: ITaskCreate): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }

  // Обновление задачи
  updateTask(taskData: ITask): Observable<any> {
    return this.http.put(this.apiUrl, taskData);
  }

}
