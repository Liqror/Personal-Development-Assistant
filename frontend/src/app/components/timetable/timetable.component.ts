import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ITimetable, IEventCreate } from 'src/app/interfaces/timetable';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  public currentRoute: string;
  // это джаваскрипт для изменения расписания
  myScriptElement: HTMLScriptElement;

  events: ITimetable;
  daysOfWeek: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  constructor(private eventService: EventService) {
    // джава скрипт для изменения расписания
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        // console.log(this.events);
      },
      error: (error) => console.error('Error ', error)
    });
    // this.createEvent();
  }

  getDayOfWeek(dayByNumOrder: number): string {
    return this.daysOfWeek[dayByNumOrder];
  }

  createEvent() {
    const newEvent: IEventCreate = {
      user_id: 1,
      week_num: 1,
      day_of_week: 0,
      event_name: "пример",
      place: "место",
      format: "offline",
      start_time: "11:11",
      stop_time: "13:13",
    }

    this.eventService.createEvent(newEvent).subscribe(response => {
      console.log("Added:", newEvent);
      // this.getEvents();  // Обновить список планов после добавления нового
    }, error => {
      console.log(newEvent);
      console.error("Error", error);
    });
  }

  updateEvent() { }

}
