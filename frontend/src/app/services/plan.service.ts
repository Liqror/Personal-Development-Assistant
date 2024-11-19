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

  // Получить все планы *изменено в бекенде
  getPlans(): Observable<IPlanFull[]> {
    const fullPlansUrl = `${this.plansApiUrl}full`;
    return this.http.get<IPlanFull[]>(fullPlansUrl);
  }

  // // Метод для получения дополнительных данных о плане по его id
  // getPlanDetails(id: number): Observable<IPlanAll> {
  //   return this.http.get<IPlanAll>(this.plansApiUrl + id);
  // }

  // Добавить новый план
  createPlan(plan: INewPlan): Observable<INewPlan> {
    return this.http.post<INewPlan>(this.plansApiUrl, plan);
  }

  // Обновить существующий план
  updatePlan(plan: IUpdatePlan): Observable<IUpdatePlan> {
    console.log("ааа", plan);
    return this.http.put<IUpdatePlan>(this.plansApiUrl, plan);
  }

  // // Удалить план по ID
  // deletePlan(id: number): Observable<any> {
  //   return this.http.delete(`${this.plansApiUrl}${id}`);
  // }
}
