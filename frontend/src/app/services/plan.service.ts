// plan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlanFull, INewPlan, IUpdatePlan } from '../interfaces/plan';


@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private plansApiUrl = 'http://localhost:8080/assistant/api/plans/';

  constructor(private http: HttpClient) {}

  // Получить все планы
  getPlans(): Observable<IPlanFull[]> {
    const fullPlansUrl = `${this.plansApiUrl}full`;
    return this.http.get<IPlanFull[]>(fullPlansUrl);
  }
  
  // Получить активные или архивные планы
  getPlansByStatus(status: number): Observable<IPlanFull[]> {
    const url = `${this.plansApiUrl}full?status=${status}`;
    return this.http.get<IPlanFull[]>(url);
  }

  // Добавить новый план
  createPlan(plan: INewPlan): Observable<INewPlan> {
    return this.http.post<INewPlan>(this.plansApiUrl, plan);
  }

  // Обновить существующий план
  updatePlan(plan: IUpdatePlan): Observable<IUpdatePlan> {
    return this.http.put<IUpdatePlan>(this.plansApiUrl, plan);
  }

  // Удалить план по ID
  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.plansApiUrl}${id}`);
  }
  
}
