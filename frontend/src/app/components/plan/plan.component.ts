import { Component } from '@angular/core';
import { IPlanFull, INewPlan, IUpdatePlan } from "../../interfaces/plan";
import { PlanService } from 'src/app/services/plan.service';
import { ITask } from 'src/app/interfaces/task';
import {ITaskPage} from "../../interfaces/task-page";
import {IFullTaskPage} from "../../interfaces/full_task_for_RUD";
import {ICategory} from "../../interfaces/category";
import {ITackCategories} from "../../interfaces/task_categories";
import { HttpClient } from '@angular/common/http';
declare function openPlan(): void;
import { IPlanForCreate } from '../../interfaces/plan';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  myScriptElement: HTMLScriptElement;
  plans: IPlanFull[];
  planVisibility: { [key: number]: boolean } = {}; // Объект для отслеживания видимости каждого плана

  // для создания нового плана
  newPlanTitle: string;
  newPlanDetails: string;

  constructor(
    private planService: PlanService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);

    this.getPlans();
  }
  togglePlanVisibility(planId: number): void {
    this.planVisibility[planId] = !this.planVisibility[planId]; // Переключаем видимость
  }

  getPlans(): void {
    this.planService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;

        // Инициализируем видимость для каждого плана
        this.plans.forEach(plan => {
          this.planVisibility[plan.id] = false; // Все планы по умолчанию скрыты
        });

      },
      error: (error) => console.error('Error', error)
    });
  }

  createNewPlan(): void {
    if (this.newPlanTitle != "") {
      const newPlan: INewPlan = {
        user_id: 1,
        name: this.newPlanTitle,
        details: this.newPlanDetails,
        status : 0,
      }

      this.planService.createPlan(newPlan).subscribe(response => {
        console.log("Plan added:", response);
        this.getPlans();  // Обновить список планов после добавления нового
      }, error => {
        console.error("Error adding plan:", error);
      });
    }
  }

  updatePlan(plan: IPlanFull): void {
    // нужно передать только часть полученных данных
    // поэтому создаем объект IUpdatePlan из IPlanFull
    const updatedPlan: IUpdatePlan = {
      id: plan.id,
      user_id: plan.user_id,
      name: plan.name,
      details: plan.details,
      status: plan.status
    };

    // Вызываем метод сервиса для обновления
    this.planService.updatePlan(updatedPlan).subscribe({
      next: (response) => {
        console.log('План обновлен успешно:', response);
      },
      error: (error) => {
        console.error('Ошибка при обновлении плана:', error);
      }
    });
  }

  deletePlan(id: number): void {
    this.planService.deletePlan(id).subscribe({
      next: () => {
        // Обновить список планов
        this.getPlans();
      },
      error: (error) => {
        console.error('Ошибка при удалении плана:', error);
      }
    });
  }
  
}
