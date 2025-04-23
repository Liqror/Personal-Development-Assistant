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

  // Обновление статуса задачи
  updateTaskStatus(id: number, status: number): Observable<any> {
    const patchBody = [
      {
        op: 'replace',
        path: '/status',
        value: status
      }
    ];
    return this.http.patch(`${this.apiUrl}/${id}`, patchBody);
  }

  // Удаление задачи
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
