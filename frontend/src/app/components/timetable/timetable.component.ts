import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ITimetable, IEventCreate, IEvent } from 'src/app/interfaces/timetable';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  // это джаваскрипт для изменения расписания
  myScriptElement: HTMLScriptElement;

  // все расписание
  timetable: ITimetable;
  daysOfWeek: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  
  // newEvent: IEventCreate;
  formEvent: IEventCreate = {
    user_id: 1,
    week_num: 0,
    day_of_week: -1,
    name: '',
    place: '',
    format: '',
    start_time: '',
    stop_time: '',
  };

  // для редактирования события
  eventBeingEdited: IEvent | null = null;

  constructor(private eventService: EventService) {
    // джава скрипт для изменения расписания
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.getTimetable();
  }

  // получение всего расписания
  getTimetable(): void {
    this.eventService.getTimetable().subscribe({
      next: (data) => {
        // this.timetable = data; - я бы хотела воспользоваться этим но не судьба
        this.timetable = this.trimEventTimes(data);
        // console.log(this.events);
      },
      error: (error) => console.error('Error ', error)
    });
  }
  // Обрезает секунды у start_time и stop_time для всех событий расписания
  trimEventTimes(timetable: ITimetable): ITimetable {
    return {
      ...timetable,
      days: timetable.days.map(day => ({
        ...day,
        odd_week: day.odd_week 
          ? day.odd_week.map(event => ({
              ...event,
              start_time: this.trimSeconds(event.start_time),
              stop_time: this.trimSeconds(event.stop_time)
            })) 
          : null,
        even_week: day.even_week 
          ? day.even_week.map(event => ({
              ...event,
              start_time: this.trimSeconds(event.start_time),
              stop_time: this.trimSeconds(event.stop_time)
            })) 
          : null
      }))
    };
  }
  // Убирает секунды из времени (формат HH:MM:SS -> HH:MM)
  trimSeconds(time: string): string {
    return time.split(':').slice(0, 2).join(':');
  }

  // Объединяет события для нечетной и четной недель по времени.
  // В результате мы получаем список пар событий с одинаковым временем для нечетной и четной недели.
  // Если для одной недели событие отсутствует, то оно будет отображаться отдельно.
  getCombinedEvents(oddWeek: IEvent[] | null, evenWeek: IEvent[] | null): 
    { odd: IEvent | null, even: IEvent | null }[] {

    const oddEvents = oddWeek || [];
    const evenEvents = evenWeek || [];

    // Собираем уникальные времена из обеих недель
    const allTimes = new Set<string>();
    oddEvents.forEach(event => allTimes.add(`${event.start_time}-${event.stop_time}`));
    evenEvents.forEach(event => allTimes.add(`${event.start_time}-${event.stop_time}`));

    // Сортируем времена
    const sortedTimes = Array.from(allTimes).sort();

    const combinedEvents = sortedTimes.map(time => {
      const [start, stop] = time.split('-');

      const oddEvent = oddEvents.find(event => event.start_time === start && event.stop_time === stop) || null;
      const evenEvent = evenEvents.find(event => event.start_time === start && event.stop_time === stop) || null;

      return { odd: oddEvent, even: evenEvent };
    });

    return combinedEvents;
  }
  
  // Метод для получения текстового названия дня недели по номеру
  getDayOfWeek(dayNum: number): string {
    return this.daysOfWeek[dayNum] || 'Неизвестный день';
  }

  fillForm(event: IEvent): void {
    console.log(event);
    this.formEvent = event;
  }
   
  createOrUpdateEvent(event: IEvent | IEventCreate): void {

  }
}
