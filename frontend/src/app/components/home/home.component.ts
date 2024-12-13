import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IHomeData } from "../../interfaces/home";
import { DatePipe } from "@angular/common";
import { TaskService } from "../../services/task.service"
import { ITaskCreate } from "../../interfaces/task";
import { ITask } from "../../interfaces/task";
import { ICategory } from "../../interfaces/category";
import { Subscription } from 'rxjs';
import { IPlan } from 'src/app/interfaces/plan';
import { CategoryService } from 'src/app/services/category.service';
import { NoteService } from 'src/app/services/note.service';
import { PlanService } from 'src/app/services/plan.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


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
  planId: number;
  taskPlan: IPlan | null;

  // для просмотра и удаления задачи
  taskId: number = -1;
  taskDataUpdate: ITask;
  
  // сохранение нажатой даты для обновления страницы при изменении задач
  date: any;



  // для заголовков таблицы
  titles: { [key: string]: string } = {
    clicked: '',
    previous: '',
    next: ''
  };
  LablesForTitles: { [key: string]: string } = {
    clicked: 'сегодня',
    previous: 'вчера',
    next: 'завтра'
  };

  // это джаваскрипт для создания задачи
  myScriptElement: HTMLScriptElement;
  private subs: Subscription;

  // Переменная для отслеживания видимости окна задачи
  isDiv1Visible: boolean = false; 

  // Дата, которую мы получили из URL
  public urlDate: string = ''; 
  // для первого получения хом дата
  private isFirstNavigation = true;

  data: IHomeData;
  categories: ICategory[];
  plans: IPlan[];

  constructor(private router: Router, // Позволяет получить параметры URL
    private http: HttpClient, // Для запросов на бэкенд
    private taskService: TaskService,
    private categoryService: CategoryService,
    private planService: PlanService,
    private noteService: NoteService) {

    // джава скрипт для создания задачи
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    
    this.router.events.subscribe(event => {
      const fullUrl = window.location.href;

      // Если это первый переход
      if (this.isFirstNavigation) {
        // console.log('Первый переход, URL:', fullUrl);

        const match = fullUrl.match(/\/(\d{4})\/(\d{2})\/(\d{2})/);
        this.urlDate = match ? `${match[1]}/${match[2]}/${match[3]}` : '';
        this.getHomeData();        

        this.isFirstNavigation = false; // Устанавливаем флаг в false, чтобы игнорировать этот блок для дальнейших переходов
      }
    });

    // После первого перехода фильтруем только NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // фильтрация только NavigationEnd
    ).subscribe(() => {
      const fullUrl = window.location.href;
      // console.log('URL изменился (NavigationEnd):', fullUrl);

      const match = fullUrl.match(/\/(\d{4})\/(\d{2})\/(\d{2})/);
      this.urlDate = match ? `${match[1]}/${match[2]}/${match[3]}` : '';
      this.getHomeData();

    });
  }
 
  // Функция для получения данных для заполнения главной таблицы
  getHomeData(): void {
    const url = `http://localhost:8080/assistant/api/${this.urlDate}`;

    if (this.urlDate) {
      this.http.get<IHomeData>(url).subscribe(
        (data: IHomeData) => {
          // console.log('Данные с бэкенда для даты:', this.urlDate);
          this.data = data; // Сохраняем данные для отображения
        },
        (error) => {
          console.error('Ошибка при получении данных с бэкенда', error);
        }
      );

      this.getTitles();
      this.getActiveCategories();
      this.getPlans();
    }    
  }

  // Функция для получения АКТИВНЫХ планов категорий
  getActiveCategories(): void {
    this.categoryService.getActiveCategories().subscribe((res: ICategory[]) => { 
      // console.log(res);
      this.categories = res;
      this.taskCategory = this.categories[0].id;
    });
  }
  
  // Функция для получения АКТИВНЫХ планов
  getPlans(): void {
    this.planService.getPlansByStatus(0).subscribe({
      next: (activePlans) => {
        this.plans = activePlans;
        // console.log('Active Plans:', activePlans);
      },
      error: (err) => {
        console.error('Error fetching active plans:', err);
      },
    });
  }

  // Функция для получения заголовков таблицы 
  getTitles() {
    const today = new Date();

    // не использую из this.data, т.к. она еще не прогрузилась на данный момент
    const urlDateObj = new Date(this.urlDate);
  
    // Проверка, если urlDate совпадает с сегодняшней датой
    this.titles = this.isSameDay(today, urlDateObj)
      ? { ...this.LablesForTitles } // Если совпадает, присваиваем LablesForTitles
      : {
          clicked: this.formatDateForTitles(urlDateObj),
          previous: this.formatDateForTitles(this.addDays(urlDateObj, -1)),
          next: this.formatDateForTitles(this.addDays(urlDateObj, 1)),
        };
  
    // console.log('Titles:', this.titles); // Проверка
  }
  // Функция для проверки, одинаковые ли дни
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString(); 
  }
  // Функция для добавления/вычитания дней
  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
  // Функция для форматирования даты в слова
  formatDateForTitles(date: Date): string {
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate().toString();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Функция проверки совпадает ли текущая дата с сегодняшней
  isToday(date: string): boolean {
    const today = new Date();
    const dateObj = new Date(date);
    return this.isSameDay(today, dateObj);
  }

  // Функция для отображения заметки только для сегодняшнего и прошедших дней
  isDateGreaterThanToday(data:string): boolean {
    const today = new Date();
    const formDate = new Date(data);
    return formDate > today;
  }





  

  // Функция для адаптивной высоты поля заметки
  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Сброс высоты
    textarea.style.height = `${textarea.scrollHeight}px`; // Установка новой высоты
  }



  // галочка на задачах
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

  getPlanById(id: number): IPlan | null {
    const foundPlan = this.plans.find(plan => plan.id === id);
    return foundPlan !== undefined ? foundPlan : null;
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

      // try {
      //   this.planId = (this.belongsPlan);
      //   this.taskPlan = this.getPlanById(this.belongsPlan);
      //   console.log("", this.taskPlan);
      // } catch (error) {
      //   console.error("Ошибка при преобразовании строки в число:", error);
      // }
      

      this.planId = Number(this.belongsPlan);// Преобразование строки в целое число потому что мы получаем строку почему-то. По-хорошему понять бы почему

      if (typeof this.planId === 'number') {
        this.taskPlan = this.getPlanById(this.planId);
        // console.log("это не id?", this.taskPlan);
      }

      const taskData: ITaskCreate = {
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
        plan_id: this.planId,
        plan: null,  
      };

      this.taskService.addTask(taskData).subscribe(
        (response) => {
          console.log('Задача успешно сохранена', response);
          // console.log("", taskData);
          // console.log("", this.belongsPlan);
          // console.log("", this.taskPlan);
          this.clear(); 
          this.getHomeData();
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
    

      const taskDataUpdate: ITask = {
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
        plan: this.taskPlan,  
        plan_id: null, // временно
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
    this.http.get<ITask>(`http://localhost:8080/assistant/api/tasks/${taskId}`).subscribe((taskInfo: ITask) => {
      
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
