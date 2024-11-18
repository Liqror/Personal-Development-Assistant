import { Component } from '@angular/core';
import {IPlanFull} from "../../interfaces/plan";
import { PlanService } from 'src/app/services/plan.service';
import { ITask } from 'src/app/interfaces/task';
import {ITaskPage} from "../../interfaces/task-page";
import {IFullTaskPage} from "../../interfaces/full_task_for_RUD";
import {ICategory} from "../../interfaces/category";
import {ITackCategories} from "../../interfaces/task_categories";
import { HttpClient } from '@angular/common/http';
declare function openPlan(): void;
import { IPlanForCreate } from '../../interfaces/plan';

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

  // ngOnInit() {
    //   await this.loadPlans();
    //   this.myScriptElement = document.createElement("script");
    //   this.myScriptElement.src = "././assets/scripts_for_project.js";
    //   document.body.appendChild(this.myScriptElement);
    // }

  ngOnInit(): void {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);

    this.planService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        console.log(this.plans);
        // Инициализируем видимость для каждого плана
        this.plans.forEach(plan => {
        this.planVisibility[plan.id] = false; // Все планы по умолчанию скрыты
      });
      },
      error: (error) => console.error('Error', error)
    });
  }
  togglePlanVisibility(planId: number): void {
    this.planVisibility[planId] = !this.planVisibility[planId]; // Переключаем видимость
  }

  saveNewPlan(): void {}

  deletePlan(id: number): void {}
  





// ниже старое и нерабочее но может я найду там вдохновение
  // allPlans: IPlanAll[]; 
  // plans: IPlanAll[]; 
  // planId: number;
  // planName: string = "";
  // planDetails: string | null = null;
  // planStatus: number;
  // planTasks: ITask[]; // возможно не нужно
  // planTasksMap: Map<number, ITask[]> = new Map(); // Хранение задач для каждого плана

  // newPlanTitle: string;
  // newPlanDetails: string;

  // constructor(
  //   private planService: PlanService,
  //   private http: HttpClient,
  // ) {}

  // async ngOnInit() {
  //   await this.loadPlans();
  //   this.myScriptElement = document.createElement("script");
  //   this.myScriptElement.src = "././assets/scripts_for_project.js";
  //   document.body.appendChild(this.myScriptElement);
  // }

  // async loadPlans() {
  //   try {
  //     this.allPlans = await this.getPlans();
  //     // console.log(this.allPlans);

  //     for (const plan of this.allPlans) {
  //       await this.getPlanDetails(plan.id);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   this.plans = this.allPlans;
  // }

  // async getPlans(): Promise<IPlanAll[]> {
  //   return this.planService.getPlans().toPromise();
  // }

  // async getPlanDetails(id: number): Promise<void> {
  //   try {
  //     const data = await this.planService.getPlanDetails(id).toPromise();
  //     const index = this.allPlans.findIndex(plan => plan.id === id);
  //     if (index !== -1) {
  //       this.allPlans[index] = { ...this.allPlans[index], ...data };
  //       console.log('Обновленные данные плана', this.allPlans[index]);
  //       // console.log("категории", index, this.allPlans[index].categories);
  //     } else {
  //       console.error('План с id', id, 'не найден.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // saveNewPlan(): void {
  //   if (this.newPlanTitle != "") {
  //     const newPlan: IPlanForCreate = {
  //       user_id: 1,
  //       name: this.newPlanTitle,
  //       details: this.newPlanDetails,
  //       status : 0,
  //     }

  //     this.planService.addPlan(newPlan).subscribe(response => {
  //       console.log("Plan added:", response);
  //       this.loadPlans();  // Обновить список планов после добавления нового
  //     }, error => {
  //       console.error("Error adding plan:", error);
  //     });
  //   }
  // }
  
  // deletePlan(id: number): void {
  //   this.planService.deletePlan(id).subscribe({
  //     next: () => {
  //       // console.log(`План с ID ${id} удален`);
  //       // Обновить список планов
  //       this.allPlans = this.allPlans.filter(plan => plan.id !== id);
  //       this.plans = this.plans.filter(plan => plan.id !== id);
  //     },
  //     error: (error) => {
  //       console.error('Ошибка при удалении плана:', error);
  //     }
  //   });
  // }

}
