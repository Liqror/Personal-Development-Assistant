import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

registerLocaleData(localeRu, 'ru');

@Component({
  selector: 'app-calendar',
  // standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe],
  // imports: [
  //   BrowserModule,
  //   CommonModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  // ],
})
export class CalendarComponent implements OnInit {
  @Input() currentDate: Date; // Теперь currentDate будет вводом компонента
  currentMonth: number;
  currentYear: number;
  // weeks: { date: string; isCurrentMonth: boolean }[][];
  weeks: { date: string; isCurrentMonth: boolean; isActive?: boolean }[][];

  monthNames: string[] = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  constructor(private datePipe: DatePipe) {}
  ngOnInit() {
    this.updateCalendar();
    this.generateCalendar();
  }

  updateCalendar() {
    // this.currentDate = new Date();
    console.log('Дата ', this.currentDate);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
    this.generateCalendar();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
    this.generateCalendar();
  }

  isCurrentMonth(date: { date: string; isCurrentMonth: boolean }): boolean {
    return date.isCurrentMonth;
  }

  isCurrentDate(day: string): boolean {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'd');
    return day === formattedDate && this.currentMonth === currentDate.getMonth() && this.currentYear === currentDate.getFullYear();
  }

  generateCalendar() {
    this.weeks = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDay = (firstDayOfMonth.getDay() + 6) % 7 + 1;

    let currentWeek: { date: string; isCurrentMonth: boolean }[] = [];

    // Заполнение предыдущими датами
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = 1; i < startDay; i++) {
      const prevMonthDate = prevMonthLastDay - (startDay - i - 1);
      currentWeek.push({ date: this.datePipe.transform(new Date(this.currentYear, this.currentMonth - 1, prevMonthDate), 'd') || '', isCurrentMonth: false });
    }

    // Заполнение текущими датами
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, i);
      currentWeek.push({ date: this.datePipe.transform(currentDate, 'd') || '', isCurrentMonth: true });
      if (currentWeek.length === 7) {
        this.weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    // Заполнение следующими датами
    let nextMonthDay = 1;
    while (currentWeek.length < 7) {
      const nextMonthDate = new Date(this.currentYear, this.currentMonth + 1, nextMonthDay);
      currentWeek.push({ date: this.datePipe.transform(nextMonthDate, 'd') || '', isCurrentMonth: false });
      nextMonthDay++;
    }

    // Заполнение оставшихся строк до 6
    while (this.weeks.length < 6) {
      this.weeks.push([...currentWeek]);
      currentWeek = Array.from({ length: 7 }, (_, i) => i + 1).map(day => {
        const nextMonthDate = new Date(this.currentYear, this.currentMonth + 1, nextMonthDay);
        nextMonthDay++;
        return { date: this.datePipe.transform(nextMonthDate, 'd') || '', isCurrentMonth: false };
      });
    }
  }

  handleDateClick(day: any): void {
    if (day.isCurrentMonth && day.date !== '') {
      console.log('Clicked on date:', day.date);
    }
  }

}
