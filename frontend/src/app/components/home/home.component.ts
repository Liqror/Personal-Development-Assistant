import { Component, Inject, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHomeData} from "../../interfaces/home";
import {DatePipe} from "@angular/common";
import { TaskService } from "../../services/task.service"
import {ITaskPage} from "../../interfaces/task-page";
import {ICategory} from "../../interfaces/category";
import {ITackCategories} from "../../interfaces/task_categories";
import { DataService } from "../../services/data.service";
import { Subscription } from 'rxjs';
import { IPlan } from 'src/app/interfaces/plan';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  // для сохранения данных из формы задачи
  taskName: string = "";
  taskEstimate: number;
  taskDescription: string | null = null;
  start: string | null = null;
  stop: string | null = null;
  startDate: string | null = null;
  stopDate: string | null = null;
  startTime: string | null = null;
  stopTime: string | null = null;
  taskCategory: number;

  currentDate: Date;
  data: IHomeData;
  categories: ICategory[];
  plans: IPlan[];

  yesterdayLabel: string = 'вчера';
  todayLabel: string = 'сегодня';
  tomorrowLabel: string = 'завтра';
  isDateClicked: boolean = false;
  formattedDate: string;
  // это джаваскрипт для создания задачи
  myScriptElement: HTMLScriptElement;
  private subs: Subscription;



  constructor(private taskService: TaskService, 
    private datePipe: DatePipe, private http: HttpClient,
    @Inject(DataService) private readonly dataService: DataService) {
    // джава скрипт для создания задачи
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
    
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.formatDateForData();

    // Вызываем загрузку данных, получение категорий и планов для создания задач
    this.getHomeData(this.formattedDate);
    // подписка на сервис для отследивания нажатий на календаре для обновления задач
    this.subs = this.dataService.dates$.subscribe((dates) => this.update(dates));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private update(data: any): void {
    console.log(data);
    this.getHomeData(data.clicked)
  }

  formatDateForData(): void {
    const year = this.currentDate.getFullYear();
    const month = this.padZero(this.currentDate.getMonth() + 1); // Месяцы начинаются с 0
    const day = this.padZero(this.currentDate.getDate());
    this.formattedDate = `${year}/${month}/${day}`;
    console.log(this.formattedDate);
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // возможно удалить
  // handleDatesChange(event: any) {
  //   this.receivedDates = event;

  //   // Получение данных из словаря
  //   const eventData = this.receivedDates.eventData;
  //   const yesterdayLabel = this.receivedDates.previous;
  //   const todayLabel = this.receivedDates.clicked;
  //   const tomorrowLabel = this.receivedDates.next;

  //   console.log(yesterdayLabel, todayLabel, tomorrowLabel)

  //   this.isDateClicked = true;
  //   console.log(eventData.clicked);
  //   this.getHomeData(eventData.clicked);
  // }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate().toString();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  getHomeData(data: string): void {
    this.http.get<IHomeData>('http://localhost:8080/assistant/api/' + data).subscribe((res: IHomeData) => {
      this.data = res;
      const sectionsToCheck = [
        res.yesterday.fixed_tasks, 
        res.today.fixed_tasks, 
        res.tomorrow.fixed_tasks, 
        res.free_tasks, 
        res.late_tasks, 
        res.soon_tasks];

      for (const tasks of sectionsToCheck) {
        if (tasks && tasks.length > 0) {
          const firstTaskId = tasks[0].id;
          
          this.getCategories(firstTaskId);
          break; // Прерываем цикл после нахождения первой задачи
        }
      }
    });
    this.getPlans();
  }

  getCategories(id: number): void {
    this.http.get<ITackCategories>('http://localhost:8080/assistant/api/tasks/'+id).subscribe((res: ITackCategories) => {
      this.categories = res.all_categories_for_user;
      this.taskCategory = this.categories[0].id;
    });
  }

  getPlans(): void {
    this.http.get<IPlan[]>('http://localhost:8080/assistant/api/plans').subscribe((res: IPlan[]) => {
      this.plans = res;
    });
  }

  saveTask(): void {
    // задача не может быть без имени, оценки и категории. категория автоматически ставиться 0
    if (this.taskName !== "" && this.taskEstimate !== undefined) {
      if (this.taskDescription === "") {
        this.taskDescription = null;
      }

      if (this.start !== null) {
        const startDateParts = this.start.split('T'); // Разделяем дату и время
        this.startDate = startDateParts[0]; // Дата без времени
        this.startTime = startDateParts[1] ? startDateParts[1].substr(0, 5) + ':00' : null; // Время с добавлением секунд
      }

      if (this.stop !== null) {
        const stopDateParts = this.stop.split('T'); // Разделяем дату и время
        this.stopDate = stopDateParts[0]; // Дата без времени
        this.stopTime = stopDateParts[1] ? stopDateParts[1].substr(0, 5) + ':00' : null; // Время с добавлением секунд
      }  

      const taskData: ITaskPage = {
        name: this.taskName,
        estimate: this.taskEstimate,
        repeat : null,
        status: 0,
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
          this.clear();
        },
        (error) => {
          console.error('Ошибка при сохранении задачи', error);
        }
      );
    }
  }

  // очистка полей НЕДОДЕЛАНА НЕ РАБОТАЕТ С ВЫПАДАЮЩИМИ СПИСКАМИ категории и планы
  clear(): void {
    this.taskName = '';
    this.taskEstimate = NaN; 
    this.taskDescription = null;
    this.start = null;
    this.stop = null;
    this.startDate = null;
    this.stopDate = null;
    this.startTime = null;
    this.stopTime = null;
    this.taskCategory = 0 ;
  }

  deleteTask(taskId: number) {
    const url = `http://localhost:8080/assistant/api/tasks/${taskId}`;
    this.http.delete(url)
      .subscribe(
        () => {
          console.log('Задача успешно удалена');
        },
        error => {
          console.error('Произошла ошибка при удалении задачи:', error);
        }
      );
  }

  getTaskInfo(event: MouseEvent, taskId: number): void {
    event.preventDefault(); // Предотвращаем стандартное действие
    this.http.get<any>(`http://localhost:8080/assistant/api/tasks/${taskId}`).subscribe((taskInfo: any) => {
      console.log('Информация о задаче:', taskInfo);
      // Здесь вы можете выполнить необходимые действия с полученной информацией о задаче
    });
  }

}  
