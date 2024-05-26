import { Component, Inject, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHomeData} from "../../interfaces/home";
import {DatePipe} from "@angular/common";
import { TaskService } from "../../services/task.service"
import {ITaskPage} from "../../interfaces/task-page";
import {IFullTaskPage} from "../../interfaces/full_task_for_RUD";
import {ICategory} from "../../interfaces/category";
import {ITackCategories} from "../../interfaces/task_categories";
import { DataService } from "../../services/data.service";
import { Subscription } from 'rxjs';
import { IPlan } from 'src/app/interfaces/plan';
import { retry } from 'rxjs/operators';
import { repeatWhen, delay } from 'rxjs/operators';
import { EMPTY, timer } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  // для сохранения данных из формы задачи
  taskName: string = "";
  taskEstimate: number;
  taskDescription: string | null = null;
  stop: string | null = null;
  startDate: string | null = null;
  stopDate: string | null = null;
  startTime: string | null = null;
  stopTime: string | null = null;
  taskStatus: number;
  taskCategory: number;
  belongsPlan: string | number = "choose";

  // для просмотра и удаления задачи
  taskId: number = -1;
  taskDataUpdate: IFullTaskPage;
  
  // сохранение нажатой даты для обновления страницы при изменении задач
  date: any;

  // сохранение нажатой даты для обновления страницы при изменении задач
  dates = {
    clicked: "сегодня",
    previous: "вчера",
    next: "завтра"
  };

  // для вчера сегодня завтра
  datesForTitle = {
    clicked: "сегодня",
    previous: "вчера",
    next: "завтра"
  };

  currentDate: Date;
  data: IHomeData;
  categories: ICategory[];
  plans: IPlan[];

  isDateClicked: boolean = false;

  // отформатированная дата которая передается на бекенд 
  formattedDate: string;


  // это джаваскрипт для создания задачи
  myScriptElement: HTMLScriptElement;
  private subs: Subscription;

  isDiv1Visible: boolean = false; // Переменная для отслеживания видимости окна задачи


  constructor(private taskService: TaskService, 
    private datePipe: DatePipe, private http: HttpClient,
    @Inject(DataService) private readonly dataService: DataService) {

    // джава скрипт для создания задачи
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    console.log("Инициализация страницы");
    this.currentDate = new Date();
    this.formatDateForData();
    this.updateDatesForTitle(this.dates.clicked);
    // Вызываем загрузку данных, получение категорий и планов для создания задач
    this.getHomeData(this.formattedDate);
    // подписка на сервис для отследивания нажатий на календаре для обновления задач
    this.subs = this.dataService.dates$.subscribe((dates) => {
      this.dates = dates;
      // this.updateDatesForTitle(dates.clicked);
      this.update(dates);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private update(dates: any): void {
    this.dates = dates;
    this.updateDatesForTitle(dates.clicked);
    console.log("в апдэйт", this.datesForTitle);
    this.getHomeData(dates.clicked);
  }

  formatDateForYTT(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate().toString();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
  }

  // изменения вида дат для вчера/сегодня/завтра
  private updateDatesForTitle(date: string): void {
    if (this.formatDateForComparison(date) == this.formattedDate) {
      this.datesForTitle = {
        clicked: "сегодня",
        previous: "вчера",
        next: "завтра"
      };
    } else {
      this.datesForTitle = {
        clicked: this.formatDateForYTT(this.dates.clicked),
        previous: this.formatDateForYTT(this.dates.previous),
        next: this.formatDateForYTT(this.dates.next)
      };
    }
    console.log("обновление дат", this.datesForTitle);
  }
  
  formatDateForData(): void {
    const year = this.currentDate.getFullYear();
    const month = this.padZero(this.currentDate.getMonth() + 1); // Месяцы начинаются с 0
    const day = this.padZero(this.currentDate.getDate());
    this.formattedDate = `${year}/${month}/${day}`;
    this.dates= {
      clicked: this.formattedDate,
      previous: this.formattedDate,
      next: this.formattedDate,
    };
  }
  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // изменения вида дат для сохранения
  formatDateForComparison(dateString: string): string {
    const [year, month, day] = dateString.split('/'); // Разделяем строку на части
    const formattedMonth = parseInt(month).toString().padStart(2, '0'); // Преобразуем месяц в число, добавляем ведущий ноль
    const formattedDay = parseInt(day).toString().padStart(2, '0'); // Преобразуем день в число, добавляем ведущий ноль
    return `${year}/${formattedMonth}/${formattedDay}`;
  }

  onCheckboxChange(event: any, task: any) {
    if (event.target.checked) {
      this.http.patch('http://localhost:8080/assistant/api/tasks/' + task.id, [
            {
                "op": "replace",
                "path": "/status",
                "value": 1
            }
        ]).subscribe(response => {
            console.log('PATCH-запрос успешно выполнен:', response);
        }, error => {
            console.error('Ошибка при выполнении PATCH-запроса:', error);
        });
    } else {
      this.http.patch('http://localhost:8080/assistant/api/tasks/' + task.id, [
            {
                "op": "replace",
                "path": "/status",
                "value": 0
            }
        ]).subscribe(response => {
            console.log('PATCH-запрос успешно выполнен:', response);
        }, error => {
            console.error('Ошибка при выполнении PATCH-запроса:', error);
        });
    }
  }

  getHomeData(date: string): void {    
    this.http.get<IHomeData>('http://localhost:8080/assistant/api/' + date)
      .pipe(
          repeatWhen(() => timer(1000)) // Повторять запрос каждую секунду, пока не получены данные
      )
      .subscribe((res: IHomeData) => {
          // Обработка полученных данных
          this.data = res;
          const sectionsToCheck = [
              res.yesterday.fixed_tasks, 
              res.today.fixed_tasks, 
              res.tomorrow.fixed_tasks, 
              res.free_tasks, 
              res.late_tasks, 
              res.soon_tasks
          ];

          for (const tasks of sectionsToCheck) {
              if (tasks && tasks.length > 0) {
                  // const firstTaskId = tasks[0].id;
                  // this.getCategories(firstTaskId);
                  this.getCategories();
                  break;
              }
          }
      },
      (error) => {
          console.error('Произошла ошибка при получении данных:', error);
      });
    this.getPlans();
  }
  
  getCategories(): void {
    this.http.get<ICategory[]>('http://localhost:8080/assistant/api/categories').subscribe((res: ICategory[]) => {
      this.categories = res;
      // console.log(this.categories);
      this.taskCategory = this.categories[0].id;
      // console.log(this.taskCategory);
    });
  }

  getPlans(): void {
    this.http.get<IPlan[]>('http://localhost:8080/assistant/api/plans').subscribe((res: IPlan[]) => {
      this.plans = res;
    });
  }
  // Просто закрытие поля просмотра/создания задачи --- кнопка закрыть(cancel)
  hideTask(): void {
    this.isDiv1Visible = false; // флаг для невидимости задачи
    this.clear();
  }

  // Сохранение задачи
  saveTask(): void {
    // задача не может быть без имени, оценки и категории. категория автоматически ставиться 0 
    if (this.taskId == -1 && this.taskName !== "" && this.taskEstimate !== undefined && !isNaN(this.taskEstimate) && (this.taskEstimate <= 100) && (this.taskEstimate >= 1)) {
      if (this.taskDescription === "") {
        this.taskDescription = null;
      }

      const taskData: ITaskPage = {
        name: this.taskName,
        estimate: this.taskEstimate,
        repeat : null,
        status: this.taskStatus,
        timezone: "Asia/Krasnoyarsk",
        user_id: 1,
        description: this.taskDescription,
        start_date: this.startDate,
        stop_date: this.stopDate,
        start_time: this.startTime,
        stop_time: this.stopTime,
        task_category: {
          id: this.taskCategory,
        },  
      };

      this.taskService.addTask(taskData).subscribe(
        (response) => {
          console.log('Задача успешно сохранена', response);
          console.log("", taskData);
          this.clear(); 
        },
        (error) => {
          console.error('Ошибка при сохранении задачи', error);
        }
      );
    }
    if (this.taskId !== -1) {

      if (this.taskDescription === "") {
        this.taskDescription = null;
      }
      
      const taskDataUpdate: IFullTaskPage = {
        id: this.taskId,
        name: this.taskName,
        estimate: this.taskEstimate,
        repeat : null,
        status: this.taskStatus,
        timezone: "Asia/Krasnoyarsk",
        user_id: 1,
        description: this.taskDescription,
        start_date: this.startDate,
        stop_date: this.stopDate,
        start_time: this.startTime,
        stop_time: this.stopTime,
        task_category: {
          id: this.taskCategory,
        },  
      };

      // console.log("Задача в режиме редактирования", taskDataUpdate);

      this.taskService.updateTask(taskDataUpdate).subscribe({
        next: (response) => {
          // console.log('Задача обновлена', response);
          this.clear();
        },
        error: (error) => {
          console.error('Ошибка при обновлении задачи', error);
        }
      });

      this.taskId = -1;
    }

    this.isDiv1Visible = false; // флаг для невидимости задачи    
  }

  // очистка полей, нужна при закрытии формы задачи
  clear(): void {
    this.taskId = -1;
    this.taskName = '';
    this.taskEstimate = NaN; 
    this.taskDescription = null;
    this.startDate = null;
    this.startTime = null;
    this.taskStatus = 0;
    this.stop = null;
    this.startDate = null;
    this.stopDate = null;
    this.startTime = null;
    this.stopTime = null;
    this.taskCategory = 1;
    this.belongsPlan = "choose";
  }

  deleteTask() {
    if (this.taskId !== -1) {
      const url = `http://localhost:8080/assistant/api/tasks/${this.taskId}`;
      this.http.delete(url)
        .subscribe(
          () => {
            console.log('Задача успешно удалена');
            this.clear();
          },
          error => {
            console.error('Произошла ошибка при удалении задачи:', error);
          }
        );
      }
    console.log('Задача просто закрыта');   
    this.isDiv1Visible = false; // флаг для невидимости задачи
  }

  getTaskInfo(event: MouseEvent, taskId: number): void {
    event.preventDefault(); // Предотвращаем стандартное действие
    this.http.get<IFullTaskPage>(`http://localhost:8080/assistant/api/tasks/${taskId}`).subscribe((taskInfo: IFullTaskPage) => {
      
      this.isDiv1Visible = true; // Показываем окно
      
      // Заполляем окно данными
      this.taskId = taskInfo.id;
      this.taskName = taskInfo.name;
      this.taskEstimate = taskInfo.estimate; 
      this.taskDescription = taskInfo.description;
      this.startDate = taskInfo.start_date;
      this.stopDate = taskInfo.stop_date;
      this.startTime = taskInfo.start_time;
      this.stopTime = taskInfo.stop_time;
      this.taskStatus = taskInfo.status;

      this.taskCategory = taskInfo.task_category.id;
      // this.belongsPlan = "choose"; // пока нет этого в бекенде

    });
  }

}  
