import { Component, OnInit } from '@angular/core';
import { LOCALE_ID, Injectable } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  currentMonth: number;
  currentYear: number;
  weeks: string[][];
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
    this.currentMonth = this.selectedDate.getMonth();
    this.currentYear = this.selectedDate.getFullYear();
  }

  nextMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.updateCalendar();
    this.generateCalendar();
  }

  prevMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.updateCalendar();
    this.generateCalendar();
  }

  generateCalendar() {
    this.weeks = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDay = (firstDayOfMonth.getDay() + 6) % 7 + 1;

    let currentWeek: string[] = [];
    for (let i = 1; i < startDay; i++) {
      currentWeek.push('');
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, i);
      const formattedDate = this.datePipe.transform(currentDate, 'd');
      currentWeek.push(formattedDate !== null ? formattedDate : '');

      if (currentWeek.length === 7) {
        this.weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }


    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push('');
      }
      this.weeks.push([...currentWeek]);
    }
  }

  isCurrentDate(day: string): boolean {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'd');
    return day === formattedDate && this.currentMonth === currentDate.getMonth() && this.currentYear === currentDate.getFullYear();
  }
}
