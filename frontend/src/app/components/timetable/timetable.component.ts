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

  constructor() {
    console.log('PlanComponent constructor called');
  }

  ngOnInit(): void {
    // Подписка на изменения маршрута
  }
}
