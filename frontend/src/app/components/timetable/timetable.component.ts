import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ITimetable, IEventCreate, IEventForTimetable } from 'src/app/interfaces/timetable';
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

  timetable: ITimetable;
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
    this.eventService.getTimetable().subscribe({
      next: (data) => {
        this.timetable = data;
        // console.log(this.events);
      },
      error: (error) => console.error('Error ', error)
    });
    // this.createEvent();
  }

  /**
 * Метод для объединения событий четной и нечетной недели
 * Если события идут не синхронно, то объединяем по индексу и проверяем на существование.
 */
  getMergedEvents(evenWeek: IEventForTimetable[] | null, oddWeek: IEventForTimetable[] | null): { even: IEventForTimetable | null, odd: IEventForTimetable | null }[] {
    const maxLength = Math.max(evenWeek?.length || 0, oddWeek?.length || 0);
    const mergedEvents = [];

    for (let i = 0; i < maxLength; i++) {
      mergedEvents.push({
        even: evenWeek?.[i] || null,
        odd: oddWeek?.[i] || null
      });
    }
    return mergedEvents;
  }

  /**
 * Объединяет события для нечетной и четной недель по времени.
 * В результате мы получаем список пар событий с одинаковым временем для нечетной и четной недели.
 * Если для одной недели событие отсутствует, то оно будет отображаться отдельно.
 */
getCombinedEvents(oddWeek: IEventForTimetable[] | null, evenWeek: IEventForTimetable[] | null): 
  { odd: IEventForTimetable | null, even: IEventForTimetable | null }[] {

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


  /**
   * Метод для отображения подробной информации о событии
   */
  showEventDetails(event: IEventForTimetable): void {
    alert(`Детали события:\nНазвание: ${event.name}\nМесто: ${event.place}\nФормат: ${event.format}`);
  }

  /**
   * Метод для удаления события
   */
  deleteEvent(eventId: number, index: number): void {
    if (confirm('Вы уверены, что хотите удалить это событие?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          alert('Событие удалено.');
          this.getEvents(); // Перезагружаем расписание после удаления
        },
        error: (error) => console.error('Ошибка при удалении события:', error)
      });
    }
  }

  /**
   * Метод для получения текстового названия дня недели по номеру
   */
  getDayOfWeek(dayNum: number): string {
    return this.daysOfWeek[dayNum] || 'Неизвестный день';
  }

  // getDayOfWeek(dayByNumOrder: number): string {
  //   return this.daysOfWeek[dayByNumOrder];
  // }

  createEvent() {
    const newEvent: IEventCreate = {
      user_id: 1,
      week_num: 2,
      day_of_week: 3,
      event_name: "чт чет",
      place: "место",
      format: "offline",
      start_time: "13:00",
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


  getMaxEventCount(evenWeek: IEventForTimetable[] | null, oddWeek: IEventForTimetable[] | null): number[] {
    const evenCount = evenWeek?.length || 0;
    const oddCount = oddWeek?.length || 0;
    const maxCount = Math.max(evenCount, oddCount);
    return Array.from({ length: maxCount });
  }
  
  // deleteEvent(id: number): void {
  //   this.eventService.deleteEvent(id).subscribe({
  //     next: () => this.getEvents(),
  //     error: (error) => console.error('Error ', error)
  //   });
  // }  

}
