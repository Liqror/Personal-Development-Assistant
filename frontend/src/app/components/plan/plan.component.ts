import { Component } from '@angular/core';
import {IPlan, IPlanAll} from "../../interfaces/plan";
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

  plans: IPlanAll[]; 
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
    // this.planService.getPlans().subscribe({
    //   next: (data) => {
    //     this.plans = data;
    //     console.log(this.plans);

    //     this.plans.forEach((plan) => {
    //       // this.getPlanDetails(plan.id); // Вызов функции получения деталей для каждого плана
    //       this.planService.getPlanDetails(plan.id).subscribe({
    //         next: (data) => {
    //           // Находим индекс плана в массиве this.plans
    //           const index = this.plans.findIndex((plan) => plan.id === plan.id);
    //           if (index !== -1) {
    //             // Обновляем данные плана с полученными данными
    //             this.plans[index] = data;
    //             console.log('Детали плана', this.plans[index]);
    //           } else {
    //             console.error('План с id', plan.id, 'не найден.');
    //           }
    //         },
    //         error: (error) => console.error(error),
    //       });
    //     });

    //   },
    //   error: (error) => console.error(error),
    // });
  }

  getPlans(): void {
    this.planService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        // console.log(this.plans);

        // Для каждого плана вызывается функция для получения дополнительных данных
        this.plans.forEach((plan) => {
          console.log(plan.id);
          this.getPlanDetails(plan.id);
        });
      },
      error: (error) => console.error(error),
    });
  }

  getPlanDetails(id: number): void {
    this.planService.getPlanDetails(id).subscribe({
      next: (data) => {
        // Находим индекс плана в массиве this.plans
        const index = this.plans.findIndex((plan) => plan.id === id);
        if (index !== -1) {
          // Обновляем данные плана с полученными данными
          this.plans[index] = { ...this.plans[index], ...data };
          // console.log('Обновленные данные плана', this.plans[index]);

          console.log("категории", index, this.plans[index].categories);
        } else {
          console.error('План с id', id, 'не найден.');
        }
      },
      error: (error) => console.error(error),
    });
  }
  

  // getPlanInformation(id: number) {
  //   console.log(id);
  //   // Отправка GET-запроса
  //   this.http.get<IPlan>('http://localhost:8080/assistant/api/plans/'+id).subscribe(
  //     (data: IPlan) => {
  //       this.planTasksMap.set(id, data.tasks); // Сохранение списка задач для данного плана
  //       console.log('Полученные данные:', this.planTasksMap);
  //     },
  //     (error) => {console.error('Ошибка при получении данных:', error);}
  //   );
  // }
  
}
