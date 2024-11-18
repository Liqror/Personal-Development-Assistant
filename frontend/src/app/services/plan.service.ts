// plan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlanFull } from '../interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private plansApiUrl = 'http://localhost:8080/assistant/api/plans/';

  constructor(private http: HttpClient) {}

  // Получить все планы *изменено в бекенде
  getPlans(): Observable<IPlanFull[]> {
    const fullPlansUrl = `${this.plansApiUrl}full`;
    return this.http.get<IPlanFull[]>(fullPlansUrl);
  }

  // // Метод для получения дополнительных данных о плане по его id
  // getPlanDetails(id: number): Observable<IPlanAll> {
  //   return this.http.get<IPlanAll>(this.plansApiUrl + id);
  // }

  // // Добавить новый план
  // addPlan(planData: any): Observable<any> {
  //   return this.http.post(this.plansApiUrl, planData);
  // }

  // // Обновить существующий план
  // updatePlan(planData: any): Observable<any> {
  //   return this.http.put(this.plansApiUrl, planData);
  // }

  // // Удалить план по ID
  // deletePlan(id: number): Observable<any> {
  //   return this.http.delete(`${this.plansApiUrl}${id}`);
  // }
}
