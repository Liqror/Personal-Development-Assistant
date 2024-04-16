import { Component } from '@angular/core';
import {IPlan} from "../../interfaces/plan";
import { PlanService } from 'src/app/services/plan.service';
import { ITask } from 'src/app/interfaces/task';
import {ITaskPage} from "../../interfaces/task-page";
import {IFullTaskPage} from "../../interfaces/full_task_for_RUD";
import {ICategory} from "../../interfaces/category";
import {ITackCategories} from "../../interfaces/task_categories";
import { HttpClient } from '@angular/common/http';
declare function openPlan(): void;

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  myScriptElement: HTMLScriptElement;

  plans: IPlan[]; // Предполагается, что планы будут массивом объектов
  planId: number;
  planName: string = "";
  planDetails: string | null = null;
  planStatus: number;
  planTasks: ITask[]; // возможно не нужно
  planTasksMap: Map<number, ITask[]> = new Map(); // Хранение задач для каждого плана

  constructor(
    private planService: PlanService,
    private http: HttpClient,
  ) {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit() {
    this.getPlans();
  }

  getPlans(): void {
    this.planService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        console.log(this.plans);
      },
      error: (error) => console.error(error),
    });
  }

  getPlanInformation(id: number) {
    console.log(id);
    // Отправка GET-запроса
    this.http.get<IPlan>('http://localhost:8080/assistant/api/plans/'+id).subscribe(
      (data: IPlan) => {
        this.planTasksMap.set(id, data.tasks); // Сохранение списка задач для данного плана
        console.log('Полученные данные:', this.planTasksMap);
      },
      (error) => {console.error('Ошибка при получении данных:', error);}
    );
  }
  
}
