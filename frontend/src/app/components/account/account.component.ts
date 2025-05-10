import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // это джаваскрипт
  myScriptElement: HTMLScriptElement;

  todayDate: string; // Форматированная текущая дата


  notesHome: boolean = true;
  timetableHome: boolean = true;
  deadlineAuto: boolean = true;
  deadlineDates: string;
  dividingWeeks: boolean = true;
  dividingWeeksDate: string;
  autoTimeZone: boolean = true;
  userTimeZone: string;
  estimate:number = 100;


  constructor() {
    // Получение текущей даты в формате YYYY-MM-DD
    this.todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
   //
  }


}
