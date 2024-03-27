// plan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private plansApiUrl = 'http://localhost:8080/assistant/api/plans';

  constructor(private http: HttpClient) {}

  // Получить все планы
  getPlans(): Observable<any> {
    return this.http.get(this.plansApiUrl);
  }

  // Получить план по ID
  getPlanById(id: number): Observable<any> {
    return this.http.get(`${this.plansApiUrl}/${id}`);
  }

  // Добавить новый план
  addPlan(planData: any): Observable<any> {
    return this.http.post(this.plansApiUrl, planData);
  }

  // Обновить существующий план
  updatePlan(planData: any): Observable<any> {
    return this.http.put(this.plansApiUrl, planData);
  }

  // Удалить план по ID
  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.plansApiUrl}/${id}`);
  }
}
