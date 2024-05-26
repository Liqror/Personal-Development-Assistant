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

  allPlans: IPlanAll[]; 
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
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "././assets/scripts_for_project.js";
    // document.body.appendChild(this.myScriptElement);
  }

  // ngOnInit() {
  //   this.getPlans();
  // }

  // getPlans(): void {
  //   this.planService.getPlans().subscribe({
  //     next: (data) => {
  //       this.allPlans = data;
  //       console.log(this.allPlans);

  //       // Для каждого плана вызывается функция для получения дополнительных данных
  //       this.allPlans.forEach((plan) => {
  //         this.getPlanDetails(plan.id);
  //       });
  //     },
  //     error: (error) => console.error(error),
  //   });
  //   this.plans = this.allPlans;
  // }

  // getPlanDetails(id: number): void {
  //   this.planService.getPlanDetails(id).subscribe({
  //     next: (data) => {
  //       // Находим индекс плана в массиве this.plans
  //       const index = this.allPlans.findIndex((allPlans) => allPlans.id === id);
  //       if (index !== -1) {
  //         // Обновляем данные плана с полученными данными
  //         this.allPlans[index] = { ...this.allPlans[index], ...data };
  //         console.log('Обновленные данные плана', this.allPlans[index]);

  //         console.log("категории", index, this.allPlans[index].categories);
  //       } else {
  //         console.error('План с id', id, 'не найден.');
  //       }
  //     },
  //     error: (error) => console.error(error),
  //   });
  // }
  

  // ngOnInit() {
  //   this.loadPlans();
  // }

  // async loadPlans() {
  //   try {
  //     await this.getPlans();
  //     this.plans = this.allPlans;
  //     console.log('Все планы загружены:', this.plans);
  //   } catch (error) {
  //     console.error('Ошибка при загрузке планов:', error);
  //   }
  // }

  // async getPlans(): Promise<void> {
  //   try {
  //     const data = await this.planService.getPlans().toPromise();
  //     this.allPlans = data;
  //     console.log(this.allPlans);

  //     // Для каждого плана вызывается функция для получения дополнительных данных
  //     const detailsPromises = this.allPlans.map(plan => this.getPlanDetails(plan.id));
  //     await Promise.all(detailsPromises);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async getPlanDetails(id: number): Promise<void> {
  //   try {
  //     const data = await this.planService.getPlanDetails(id).toPromise();
  //     // Находим индекс плана в массиве this.allPlans
  //     const index = this.allPlans.findIndex(plan => plan.id === id);
  //     if (index !== -1) {
  //       // Обновляем данные плана с полученными данными
  //       this.allPlans[index] = { ...this.allPlans[index], ...data };
  //       console.log('Обновленные данные плана', this.allPlans[index]);
  //       console.log("категории", index, this.allPlans[index].categories);
  //     } else {
  //       console.error('План с id', id, 'не найден.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  async ngOnInit() {
    await this.loadPlans();
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  async loadPlans() {
    try {
      this.allPlans = await this.getPlans();
      // console.log(this.allPlans);

      for (const plan of this.allPlans) {
        await this.getPlanDetails(plan.id);
      }
    } catch (error) {
      console.error(error);
    }
    this.plans = this.allPlans;
  }

  async getPlans(): Promise<IPlanAll[]> {
    return this.planService.getPlans().toPromise();
  }

  async getPlanDetails(id: number): Promise<void> {
    try {
      const data = await this.planService.getPlanDetails(id).toPromise();
      const index = this.allPlans.findIndex(plan => plan.id === id);
      if (index !== -1) {
        this.allPlans[index] = { ...this.allPlans[index], ...data };
        // console.log('Обновленные данные плана', this.allPlans[index]);
        // console.log("категории", index, this.allPlans[index].categories);
      } else {
        console.error('План с id', id, 'не найден.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
}
