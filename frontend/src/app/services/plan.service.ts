// plan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlan, IPlanCreate, IPlanUpdate } from '../interfaces/plan';


@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private plansApiUrl = 'http://localhost:8080/assistant/api/plans/';

  constructor(private http: HttpClient) {}

  // Получить все планы
  getPlans(): Observable<IPlan[]> {
    const fullPlansUrl = `${this.plansApiUrl}full`;
    return this.http.get<IPlan[]>(fullPlansUrl);
  }
  
  // Получить активные или архивные планы
  getPlansByStatus(status: number): Observable<IPlan[]> {
    const url = `${this.plansApiUrl}full?status=${status}`;
    return this.http.get<IPlan[]>(url);
  }

  // Добавить новый план
  createPlan(plan: IPlanCreate): Observable<IPlanCreate> {
    return this.http.post<IPlanCreate>(this.plansApiUrl, plan);
  }

  // Обновить существующий план
  updatePlan(plan: IPlanUpdate): Observable<IPlanUpdate> {
    return this.http.put<IPlanUpdate>(this.plansApiUrl, plan);
  }

  // Удалить план по ID
  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.plansApiUrl}${id}`);
  } 
}
