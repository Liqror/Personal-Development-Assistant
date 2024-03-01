import { Component, Inject, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHomeData} from "../../interfaces/home";
import {DatePipe} from "@angular/common";
import { TaskService } from "../../services/task.service"
import {ITaskPage} from "../../interfaces/task-page";
import { DataService } from "../../services/data.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  taskData: ITaskPage = {
  user_id: 1,
  name: 'fgfgfgfg',
  description: null,
  estimate: 0,
  task_category: {
    id: 0,
  },
  start_date: "2023/12/26",
  stop_date: null,
  start_time: null,
  stop_time: null,
  timezone: "",
  status: 0,};
  currentDate: Date;
  data: IHomeData;
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

    // Вызываем загрузку данных
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
    });
  }

//   передача данных Наташе
  saveTask(): void {
    const taskData: ITaskPage = {
      user_id: 1,
      name: '1111',
      description: null,
      estimate: 1,
      task_category: {
        id: 1,
      },
      start_date: "2024-03-01",
      stop_date: "2024-03-01",
      start_time: null,
      stop_time: null,
      timezone: "",
      status: 0,};
    this.taskService.addTask(taskData).subscribe(
      (response) => {
        console.log('Задача успешно сохранена', response);
      },
      (error) => {
        console.error('Ошибка при сохранении задачи', error);
      }
    );
  }
}
