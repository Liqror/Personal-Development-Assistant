import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { ITimetable } from 'src/app/interfaces/timetable';
import { TimetableService } from 'src/app/services/event.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  public currentRoute: string;
  // это джаваскрипт для изменения расписания
  myScriptElement: HTMLScriptElement;

  timetable: ITimetable;
  daysOfWeek: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  constructor(private timetableService: TimetableService) {
    // джава скрипт для изменения расписания
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.timetableService.getEvents().subscribe({
      next: (data) => {
        this.timetable = data;
        console.log(this.timetable);
      },
      error: (error) => console.error('Error fetching timetable', error)
    });
  }

  getDayOfWeek(dayByNumOrder: number): string {
    return this.daysOfWeek[dayByNumOrder];
  }
}