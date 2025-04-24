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

  constructor() {
    // Получение текущей даты в формате YYYY-MM-DD
    this.todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
   //
  }


}
