import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHomeData} from "./interfaces/home";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ассистент по Саморазвитию';
  currentDate: Date;
  data: IHomeData;
  yesterdayLabel: string = 'вчера';
  todayLabel: string = 'сегодня';
  tomorrowLabel: string = 'завтра';
  isDateClicked: boolean = false;
  formattedDate: string;

  constructor(private datePipe: DatePipe, private http: HttpClient, private router: Router) {
    // goHome() {
    //   this.router.navigate(['']);
    // }
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.formatDateForData();

    // Вызываем загрузку данных
    this.getHomeData(this.formattedDate);
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
