import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  @Output() datesChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private datePipe: DatePipe,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.formatDateForData();
    this.datesChange;
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
    this.isDateClicked = true;

    // Передаем данные дат в хом компонент ??
    this.datesChange.emit({
      eventData: eventData,
      previous: eventData.previous,
      clicked: eventData.clicked,
      next: eventData.next
    });
  }
}
