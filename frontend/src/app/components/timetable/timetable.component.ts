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

  // создание события/ий
  formEvent = {
    name: '',
    place: '',
    format: 'Онлайн',
    start_time: '',
    stop_time: ''
  };
  selectedDaysOfWeek: number[] = []; // Номера дней недели [0, 1, 2, ...]
  selectedRepeatOption: 'each' | 'odd' | 'even' = 'each'; // Вариант повторения

  constructor(private eventService: EventService) {
    // джава скрипт для изменения расписания
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.getTimetable();
  }

  // удалить ВСЁ
  deleteAllEvents(timetable: ITimetable): void {
    // Собираем все id событий из расписания (и из четных, и из нечетных недель)
    const eventIds: number[] = [];
  
    // Проходим по дням недели
    timetable.days.forEach(day => {
      // Добавляем id для нечетной недели
      if (day.odd_week) {
        day.odd_week.forEach(event => eventIds.push(event.id));
      }
  
      // Добавляем id для четной недели
      if (day.even_week) {
        day.even_week.forEach(event => eventIds.push(event.id));
      }
    });
  
    // Теперь удаляем все события поочередно
    eventIds.forEach(id => {
      this.eventService.deleteEvent(id).subscribe({
        next: () => console.log(`Событие с id ${id} успешно удалено`),
        error: (error) => console.error(`Ошибка при удалении события с id ${id}:`, error)
      });
    });
  }
  
  // получение всего расписания
  getTimetable(): void {
    this.eventService.getTimetable().subscribe({
      next: (data) => {
        // this.timetable = data; - я бы хотела воспользоваться этим но не судьба
        this.timetable = this.trimEventTimes(data);
        // console.log(this.timetable);
        // Пример использования функции
        // this.deleteAllEvents(this.timetable);
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

  // Метод для обработки нажатия на кнопки дней недели
  toggleDaySelection(dayNumber: number) {
    const index = this.selectedDaysOfWeek.indexOf(dayNumber);
    if (index === -1) {
      this.selectedDaysOfWeek.push(dayNumber);
    } else {
      this.selectedDaysOfWeek.splice(index, 1);
    }
  }
  
  // создание событие/ий
  createEvent() {
    const userId = 1; // ID текущего пользователя, его можно взять из контекста авторизации
    const { name, place, format, start_time, stop_time } = this.formEvent;
  
    // Проверяем сразу все необходимые поля и условия
    if (name && place && format && start_time && stop_time && this.selectedDaysOfWeek?.length && this.selectedRepeatOption) {
      
      const weeksToCreate = this.getWeeksForCreation(this.selectedRepeatOption);
      const events: IEventCreate[] = [];
  
      for (const week of weeksToCreate) {
        for (const day of this.selectedDaysOfWeek) {
          events.push({
            user_id: userId,
            week_num: week,
            day_of_week: day,
            name: name,
            place: place,
            format: format,
            start_time: start_time,
            stop_time: stop_time
          });
        }
      }
  
      events.forEach(event => {
        this.eventService.createEvent(event).subscribe({
          next: () => {
            // console.log('Событие успешно создано:', event);
            this.getTimetable();
          },
          error: (error) => console.error('Ошибка при создании события:', event, error)
        });
      });

      this.getTimetable();

    }
    else{
      console.log("что-то не заполнено");
      console.log(name, place, format, start_time, stop_time, this.selectedDaysOfWeek?.length, this.selectedRepeatOption);
    }
  }
  
  // Определяет недели, для которых нужно создавать события
  getWeeksForCreation(repeatOption: 'each' | 'odd' | 'even'): number[] {
    if (repeatOption === 'each') return [1, 2]; // Каждую неделю — обе недели
    if (repeatOption === 'odd') return [1]; // Нечетная неделя
    if (repeatOption === 'even') return [2]; // Четная неделя
    return [];
  }
  
  // Метод для выбора варианта повторения (чётная/нечётная/каждая неделя)
  selectRepeatOption(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRepeatOption = selectElement.value as 'each' | 'odd' | 'even'; // Прямое присвоение значения
    // console.log('Выбрано значение:', this.selectedRepeatOption);
  }

  // Просмотр мероприятия
  viewEvent(event: IEvent): void {
    // Заполняем данные формы
    this.formEvent = {
      name: event.name,
      place: event.place,
      format: event.format,
      start_time: event.start_time,
      stop_time: event.stop_time
    };

    // Заполняем дни недели
    this.selectedDaysOfWeek = [event.day_of_week]; // Делаем выбранным только тот день недели

    // Устанавливаем вариант повторения (each, odd, or even)
    this.selectedRepeatOption = event.week_num === 1 ? 'odd' : (event.week_num === 2 ? 'even' : 'each');

    // Делаем подсветку для дня недели
    const buttons = document.querySelectorAll('.clickable2');
    buttons.forEach(button => {
      // Убираем подсветку с всех кнопок
      button.classList.remove('clicked');
      
      // Получаем значение из атрибута data-day
      const day = parseInt(button.getAttribute('data-day') || '0');
      
      // Подсвечиваем кнопку, если её data-day соответствует event.day_of_week
      if (day === event.day_of_week) {
        button.classList.add('clicked'); // Подсвечиваем
      }
    });

    // Устанавливаем правильное значение в селектор повторения
    const repeatSelect = document.getElementById('repeatSubj') as HTMLSelectElement;
    if (repeatSelect) {
      repeatSelect.value = this.selectedRepeatOption; // Устанавливаем значение для повторения
    }

  }

  // Очистка формы после сохранения
  clearForm() {

    // Очистка данных формы
    this.formEvent = {
      name: '',
      place: '',
      format: 'Онлайн',
      start_time: '',
      stop_time: ''
    };
    
    // Очистка выбранных дней
    this.selectedDaysOfWeek = [];
    
    // Сброс значения выбранного варианта повторения
    this.selectedRepeatOption = 'each';
  
    // Сброс значения в форме (для <select>)
    const repeatSelect = document.getElementById('repeatSubj') as HTMLSelectElement;
    if (repeatSelect) {
      repeatSelect.value = 'each'; // Устанавливаем значение на "Каждую неделю"
    }
  
    // Убираем подсветку с кнопок
    const buttons = document.querySelectorAll('.clickable2')
    buttons.forEach(button => {
      button.classList.remove('clicked'); // Убираем класс подсветки
    });
  }

}
