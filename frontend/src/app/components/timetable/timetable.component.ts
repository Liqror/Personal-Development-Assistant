import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  public currentRoute: string;
  // это джаваскрипт для изменения расписания
  myScriptElement: HTMLScriptElement;

  /*constructor() {
    console.log('PlanComponent constructor called');
  }*/
  constructor() {
    // джава скрипт для изменения расписания
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }


  ngOnInit(): void {
    // Подписка на изменения маршрута
  }
}
