import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHomeData} from "../../interfaces/home";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  currentDate: Date;
  data: IHomeData;
  yesterdayLabel: string = 'вчера';
  todayLabel: string = 'сегодня';
  tomorrowLabel: string = 'завтра';
  isDateClicked: boolean = false;
  formattedDate: string;
  // это джаваскрипт для создания задачи
  myScriptElement: HTMLScriptElement;
  isHidden = true;


  constructor(private datePipe: DatePipe, private http: HttpClient) {
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
  }

  // создание задачи
  handleButtonClickNewTack(): void {
    console.log('Кнопка была нажата!');
    // Инвертируем значение только если элемент скрыт
    if (this.isHidden) {
      this.isHidden = false;
    }
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

  handleDateClicked(eventData: any) {
    console.log(eventData.clicked)
    this.yesterdayLabel = this.formatDate(eventData.previous);
    this.todayLabel = this.formatDate(eventData.clicked);
    this.tomorrowLabel = this.formatDate(eventData.next);
    this.isDateClicked = true;
    this.getHomeData(eventData.clicked);
  }
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
}
