import { Component } from '@angular/core';
import { IPlan, IPlanCreate, IPlanUpdate } from "../../interfaces/plan";
import { PlanService } from 'src/app/services/plan.service';
declare function openPlan(): void;


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  myScriptElement: HTMLScriptElement;

  // Получение планов
  activePlans: IPlan[];
  archivedPlans: IPlan[];

  // Объект для отслеживания видимости каждого плана
  planVisibility: { [key: number]: boolean } = {}; 

  // Создания нового плана
  newPlan: IPlanCreate = {
    user_id: 1,
    name: "",
    details: "",
    start_date: "",
    stop_date: "",
    status : 0,
  }

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);

    this.getPlans();
  }

  // открытие/закрытие планов
  togglePlanVisibility(planId: number): void {
    this.planVisibility[planId] = !this.planVisibility[planId]; // Переключаем видимость
  }

  getPlans(): void {
    // Получить активные планы
    this.planService.getPlansByStatus(0).subscribe({
      next: (activePlans) => {
        this.activePlans = activePlans;
        // console.log('Active Plans:', activePlans);

        // Инициализируем видимость для каждого плана
        this.activePlans.forEach(activePlans => {
          this.planVisibility[activePlans.id] = false; // Все планы по умолчанию скрыты
        });
      },
      error: (err) => {
        console.error('Error fetching active plans:', err);
      },
    });

    // Получить архивные планы
    this.planService.getPlansByStatus(1).subscribe({
      next: (archivedPlans) => {
        this.archivedPlans = archivedPlans;
        // console.log('Archived Plans:', archivedPlans);

        // Инициализируем видимость для каждого плана
        this.archivedPlans.forEach(archivedPlans => {
          this.planVisibility[archivedPlans.id] = false; // Все планы по умолчанию скрыты
        });
      },
      error: (err) => {
        console.error('Error fetching archived plans:', err);
      },
    });
  }

  createNewPlan(): void {
    if (this.newPlan.name != "") {

      this.planService.createPlan(this.newPlan).subscribe(response => {
        // console.log("Plan added:", response);
        this.getPlans();  // Обновить список планов после добавления нового
      }, error => {
        console.error("Error adding plan:", error);
      });
    }
    this.cleanForm();
  }

  updatePlan(plan: IPlan): void {
    // нужно передать только часть полученных данных
    // поэтому создаем объект IPlanUpdate из IPlan
    const updatedPlan: IPlanUpdate = {
      id: plan.id,
      user_id: plan.user_id,
      name: plan.name,
      details: plan.details,
      start_date:  plan.start_date,
      stop_date: plan.stop_date,
      status: plan.status
    };

    // Вызываем метод сервиса для обновления
    this.planService.updatePlan(updatedPlan).subscribe({
      next: (response) => {
        // console.log('План обновлен успешно:', response);
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

  cleanForm(): void {
    this.newPlan = {
      user_id: 1,
      name: "",
      details: "",
      start_date: "",
      stop_date: "",
      status : 0,
    }
  }

  // функция из хом пока заглушка потому что хом в рефакторинге
  getTaskInfo(event: MouseEvent, taskId: number): void {
    // event.preventDefault(); // Предотвращаем стандартное действие
    // this.http.get<IFullTaskPage>(`http://localhost:8080/assistant/api/tasks/${taskId}`).subscribe((taskInfo: IFullTaskPage) => {
      
    //   this.isDiv1Visible = true; // Показываем окно
      
    //   // Заполляем окно данными
    //   this.taskId = taskInfo.id;
    //   this.taskName = taskInfo.name;
    //   this.taskEstimate = taskInfo.estimate; 
    //   this.taskDescription = taskInfo.description;
    //   this.startDate = taskInfo.start_date;
    //   this.stopDate = taskInfo.stop_date;
    //   this.startTime = taskInfo.start_time;
    //   this.stopTime = taskInfo.stop_time;
    //   this.taskStatus = taskInfo.status;

    //   this.taskCategory = taskInfo.task_category.id;
    //   // this.belongsPlan = "choose"; // пока нет этого в бекенде

    // });
  }
  onCheckboxChange(event: any, task: any) {
    // if (event.target.checked) {
    //   this.http.patch('http://localhost:8080/assistant/api/tasks/' + task.id, [
    //         {
    //             "op": "replace",
    //             "path": "/status",
    //             "value": 1
    //         }
    //     ]).subscribe(response => {
    //         console.log('PATCH-запрос успешно выполнен:', response);
    //     }, error => {
    //         console.error('Ошибка при выполнении PATCH-запроса:', error);
    //     });
    // } else {
    //   this.http.patch('http://localhost:8080/assistant/api/tasks/' + task.id, [
    //         {
    //             "op": "replace",
    //             "path": "/status",
    //             "value": 0
    //         }
    //     ]).subscribe(response => {
    //         console.log('PATCH-запрос успешно выполнен:', response);
    //     }, error => {
    //         console.error('Ошибка при выполнении PATCH-запроса:', error);
    //     });
    // }
  }

}
