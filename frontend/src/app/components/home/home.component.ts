import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { IHomeData } from "../../interfaces/home";
import { ITimetable } from 'src/app/interfaces/timetable';

import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from "../../interfaces/category";

import { NoteService } from 'src/app/services/note.service';
import { INote, INoteForCreate } from 'src/app/interfaces/note';

import { PlanService } from 'src/app/services/plan.service';
import { IPlan } from 'src/app/interfaces/plan';

import { TaskService } from "../../services/task.service"
import { ITaskCreate, ITask, IRepeat } from "../../interfaces/task";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  // это джаваскрипт для создания задачи
  myScriptElement: HTMLScriptElement;
  private subs: Subscription;

  @ViewChild('noteTextarea') noteTextarea!: ElementRef<HTMLTextAreaElement>;

  // для сохранения данных из формы задачи
  taskName: string = "";
  taskEstimate: number;
  taskDescription: string | null = null;
  stop: string | null = null;
  startDate: string | null = null;
  stopDate: string | null = null;
  startTime: string | null = null;
  stopTime: string | null = null;
  taskStatus: number = 0;
  taskCategory: number;
  belongsPlan: string | number = "choose";
  planId: number | null;
  taskPlan: IPlan | null;
  
  repeatForm: IRepeat = {
    start: '' as string,  // Стартовая дата
    repeat_interval: null as number | null,
    term: 'week' as string,
    days: [] as number[], // Список дней недели
    end: '' as string | null,    // Дата окончания
    number_of_repeats: 0 as number, // Количество повторений
  };
  
  // для просмотра и удаления задачи
  taskId: number = -1;
  taskDataUpdate: ITask;
  
  // сохранение нажатой даты для обновления страницы при изменении задач
  date: any;


  // для заголовков таблицы
  titles: { [key: string]: string } = {
    clicked: '',
    previous: '',
    next: ''
  };
  LablesForTitles: { [key: string]: string } = {
    clicked: 'сегодня',
    previous: 'вчера',
    next: 'завтра'
  };

  // Переменная для отслеживания видимости окна задачи
  isDiv1Visible: boolean = false; 

  // Дата, которую мы получили из URL
  public urlDate: string = ''; 
  // для первого получения хом дата
  private isFirstNavigation = true;

  data: IHomeData;
  categories: ICategory[];
  plans: IPlan[];

  constructor(private router: Router, // Позволяет получить параметры URL
    private http: HttpClient, // Для запросов на бэкенд
    private taskService: TaskService,
    private categoryService: CategoryService,
    private planService: PlanService,
    private noteService: NoteService) {

    // джава скрипт для создания задачи
    this.myScriptElement = document.createElement("script");
    this.myScriptElement.src = "././assets/scripts_for_project.js";
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    
    this.router.events.subscribe(event => {
      const fullUrl = window.location.href;

      // Если это первый переход
      if (this.isFirstNavigation) {
        // console.log('Первый переход, URL:', fullUrl);

        const match = fullUrl.match(/\/(\d{4})\/(\d{2})\/(\d{2})/);
        this.urlDate = match ? `${match[1]}/${match[2]}/${match[3]}` : '';
        this.getHomeData();        

        this.isFirstNavigation = false; // Устанавливаем флаг в false, чтобы игнорировать этот блок для дальнейших переходов
      }
    });

    // После первого перехода фильтруем только NavigationEnd
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // фильтрация только NavigationEnd
    ).subscribe(() => {
      const fullUrl = window.location.href;
      // console.log('URL изменился (NavigationEnd):', fullUrl);

      const match = fullUrl.match(/\/(\d{4})\/(\d{2})\/(\d{2})/);
      this.urlDate = match ? `${match[1]}/${match[2]}/${match[3]}` : '';
      this.getHomeData();

    });
  }
 
  // Функция для получения данных для заполнения главной таблицы
  getHomeData(): void {
    const url = `http://localhost:8080/assistant/api/${this.urlDate}`;
    if (this.urlDate) {
      this.http.get<IHomeData>(url).subscribe(
        (data: IHomeData) => {
          // console.log('Данные с бэкенда для даты:', this.urlDate);
          this.data = data; // Сохраняем данные для отображения

          // Устанавливаем высоту textarea после загрузки текста
          setTimeout(() => this.updateTextareaHeight(), 0);
        },
        (error) => {
          console.error('Ошибка при получении данных с бэкенда', error);
        }
      );
      this.getTitles();
      this.getActiveCategories();
      this.getPlans();
    }    
  }

  // Функция обрезает секунды у start_time и stop_time для всех событий расписания
  trimEventTimes(timetable: ITimetable): ITimetable {
    return {
      ...timetable,
      days: timetable.days.map(day => ({
        ...day,
        odd_week: day.odd_week?.map(event => ({
          ...event,
          start_time: event.start_time.slice(0, 5), // Убираем секунды (HH:MM:SS -> HH:MM)
          stop_time: event.stop_time.slice(0, 5)   // Убираем секунды (HH:MM:SS -> HH:MM)
        })) || null,
        even_week: day.even_week?.map(event => ({
          ...event,
          start_time: event.start_time.slice(0, 5), // Убираем секунды (HH:MM:SS -> HH:MM)
          stop_time: event.stop_time.slice(0, 5)   // Убираем секунды (HH:MM:SS -> HH:MM)
        })) || null
      }))
    };
  }

  // Функция для получения АКТИВНЫХ планов категорий
  getActiveCategories(): void {
    this.categoryService.getActiveCategories().subscribe((res: ICategory[]) => { 
      // console.log(res);
      this.categories = res;
      this.taskCategory = this.categories[0].id;
    });
  }
  
  // Функция для получения АКТИВНЫХ планов
  getPlans(): void {
    this.planService.getPlansByStatus(0).subscribe({
      next: (activePlans) => {
        this.plans = activePlans;
        // console.log('Active Plans:', activePlans);
      },
      error: (err) => {
        console.error('Error fetching active plans:', err);
      },
    });
  }

  // Функция для получения заголовков таблицы 
  getTitles() {
    const today = new Date();

    // не использую из this.data, т.к. она еще не прогрузилась на данный момент
    const urlDateObj = new Date(this.urlDate);
  
    // Проверка, если urlDate совпадает с сегодняшней датой
    this.titles = this.isSameDay(today, urlDateObj)
      ? { ...this.LablesForTitles } // Если совпадает, присваиваем LablesForTitles
      : {
          clicked: this.formatDateForTitles(urlDateObj),
          previous: this.formatDateForTitles(this.addDays(urlDateObj, -1)),
          next: this.formatDateForTitles(this.addDays(urlDateObj, 1)),
        };
  
    // console.log('Titles:', this.titles); // Проверка
  }
  // Функция для проверки, одинаковые ли дни
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString(); 
  }
  // Функция для добавления/вычитания дней
  addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
  // Функция для форматирования даты в слова
  formatDateForTitles(date: Date): string {
    const monthNames = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const day = date.getDate().toString();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Функция проверки совпадает ли текущая дата с сегодняшней
  isToday(date: string): boolean {
    const today = new Date();
    const dateObj = new Date(date);
    return this.isSameDay(today, dateObj);
  }

  // Функция для отображения заметки только для сегодняшнего и прошедших дней
  isDateGreaterThanToday(data:string): boolean {
    const today = new Date();
    const formDate = new Date(data);
    today.setHours(0, 0, 0, 0);
    formDate.setHours(0, 0, 0, 0);
    return formDate > today;
  }

  // Функция для работы с полем заметки - обновление и создание (других CDUD операций нет)
  updateAndCreateNote(note: INote): void {
    // note.assigned_day передается как 2024-12-13, а this.urlDate как 2024/12/13
    if (note.assigned_day == this.urlDate.replace(/\//g, '-')) {
      // console.log("Даты совпадают");
      this.noteService.updateNote(note).subscribe({
        next: (note) => {
          console.log("заметка обновлена", note);
        },
        error: (error) => {
          console.error('Ошибка при обновлении заметки:', error);
        }
      });
    } else {
      // console.log("Даты не совпадают");
      const newNote: INoteForCreate = {
        user_id: 1,
        assigned_day: this.urlDate.replace(/\//g, '-'),
        text: note.text,
      }
      this.noteService.createNote(newNote).subscribe({
        next: (newNote) => {
          console.log("заметка создана", newNote);
          this.getHomeData();
        },
        error: (error) => {
          console.error('Ошибка при создании заметки:', error);
        }
      });
    }
    this.updateTextareaHeight();
  }  

  // Устанавливаем высоту текстового поля ввода текста заметки
  updateTextareaHeight(): void {
    if (!this.noteTextarea) return;

    const textarea = this.noteTextarea.nativeElement;
    textarea.style.height = 'auto'; // сбросить текущую высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // установить высоту по контенту
  }

  // вывод заметки учитывая \n
  formatTextWithLineBreaks(text: string): string {
    return text?.replace(/\n/g, '<br>') || ''; // Заменяем \n на <br>, а также защищаем от пустого текста
  }

  // Смена статуса задачи - галочка 
  onCheckboxChange(event: any, task: any) {
    const newStatus = event.target.checked ? 1 : 0;
  
    this.taskService.updateTaskStatus(task.id, newStatus).subscribe({
      next: (response) => {
        // console.log('PATCH-запрос успешно выполнен:', response);
        this.getHomeData();
      },
      error: (error) => {
        console.error('Ошибка при выполнении PATCH-запроса:', error);
      }
    });
  }

  getPlanById(id: number): IPlan | null {
    const foundPlan = this.plans.find(plan => plan.id === id);
    return foundPlan !== undefined ? foundPlan : null;
  }

  // Просто закрытие поля просмотра/создания задачи --- кнопка закрыть(cancel)
  hideTask(): void {
    this.isDiv1Visible = false; // флаг для невидимости задачи
    this.clear();
  }

  // Функция выбора дней недели для повторяющейся задачи
  toggleDay(dayIndex: number): void {
    const index = this.repeatForm.days.indexOf(dayIndex);
    if (index === -1) {
      // Добавляем день, если его еще нет в списке
      this.repeatForm.days.push(dayIndex);
    } else {
      // Удаляем день, если он уже есть в списке
      this.repeatForm.days.splice(index, 1);
    }
    // console.log('Selected days:', this.repeatForm.days);
  }

  // Функция для проверки всех стандартных условий для Задачи
  isValidTask(): boolean {
    // Проверка даты и времени
    if ((this.startTime && !this.startDate) || (this.stopTime && !this.stopDate)) {
      return false; // Если время есть, но нет даты
    }
    if (this.startDate && this.stopDate && (this.startDate > this.stopDate)) {
      return false; 
    }
    if (this.startDate && this.stopDate && this.startTime && this.stopTime &&
      (this.startDate == this.stopDate) && (this.startTime > this.stopTime)) {
      return false; 
    }

    // Проверка на валидность оценки задачи
    return this.taskName !== "" && 
    this.taskEstimate !== undefined && 
          !isNaN(this.taskEstimate) && 
          this.taskEstimate >= 1 && 
          this.taskEstimate <= 100;
  }

  // Функция для проверки формы с повторами
  isValidRepeatForm(): boolean {
    const checkbox = document.getElementById('chkTest') as HTMLInputElement;
    const repeatChecked = checkbox?.checked;
  
    if (!repeatChecked) {
      return true; // Никаких проверок не нужно
    }
  
    if (!this.repeatForm.start) {
      console.error('Не указана дата начала повторов');
      return false;
    }
  
    if (!this.repeatForm.repeat_interval || this.repeatForm.repeat_interval <= 0) {
      console.error('Интервал повторов должен быть больше 0');
      return false;
    }
  
    if (this.repeatForm.term === 'week' && (!this.repeatForm.days || this.repeatForm.days.length === 0)) {
      console.error('Выберите хотя бы один день недели');
      return false;
    }
  
    const selectedEnd = (document.querySelector('input[name="drone"]:checked') as HTMLInputElement)?.value;
  
    if (selectedEnd === 'data-when-end-task') {
      if (!this.repeatForm.end) {
        console.error('Не указана дата окончания');
        return false;
      }
    }
  
    if (selectedEnd === 'how-repeat-task') {
      if (!this.repeatForm.number_of_repeats || this.repeatForm.number_of_repeats <= 0) {
        console.error('Количество повторов должно быть больше 0');
        this.repeatForm.end = null;
        return false;
      }
    }
  
    if (selectedEnd === 'never-end-task') {
      this.repeatForm.number_of_repeats = 0;
      this.repeatForm.end = null;
    }
  
    return true;
  }
  

  // Кнопка сохранение задачи
  saveTask(): void {

    // Создание задачи
    if (this.taskId == -1 && this.isValidTask() && this.isValidRepeatForm()) {

      if (this.taskDescription === "") {
        this.taskDescription = null;
      }      

      this.planId = Number(this.belongsPlan);

      const taskData: ITaskCreate = {
        name: this.taskName,
        estimate: this.taskEstimate,
        status: this.taskStatus,
        timezone: "Asia/Krasnoyarsk",
        user_id: 1,
        description: this.taskDescription,
        start_date: this.startDate,
        stop_date: this.stopDate,
        start_time: this.startTime,
        stop_time: this.stopTime,
        task_category: {
          id: this.taskCategory,
        },
        plan_id: this.planId,
        plan: null,  
        repeat : null,
      };

      const checkbox = document.getElementById('chkTest') as HTMLInputElement;
      const repeatChecked = checkbox?.checked;
      if (repeatChecked) {
        taskData.repeat = this.repeatForm;
      }

      console.log('Данные задачи:', taskData); // Проверка
      // console.log("Что в повторе?", this.repeatForm)

      this.taskService.addTask(taskData).subscribe(
        (response) => {
          console.log('Задача успешно сохранена', response);
          this.clear(); 
          this.getHomeData();
        },
        (error) => {
          console.error('Ошибка при сохранении задачи', error);
        }
      );
    }

    // задача в режиме редактирования
    if (this.taskId !== -1) {

      if (this.taskDescription === "") {
        this.taskDescription = null;
      }

      this.planId = Number(this.belongsPlan); 
    
      const taskDataUpdate: ITask = {
        id: this.taskId,
        name: this.taskName,
        estimate: this.taskEstimate,
        repeat : null,
        status: this.taskStatus,
        timezone: "Asia/Krasnoyarsk",
        user_id: 1,
        description: this.taskDescription,
        start_date: this.startDate,
        stop_date: this.stopDate,
        start_time: this.startTime,
        stop_time: this.stopTime,
        task_category: {
          id: this.taskCategory,
        },
        plan_id: this.planId,
        plan: null, 
      };

      const checkbox = document.getElementById('chkTest') as HTMLInputElement;
      const repeatChecked = checkbox?.checked;
      if (repeatChecked) {
        taskDataUpdate.repeat = this.repeatForm;
      }

      // console.log('Данные задачи для обновления:', taskDataUpdate); // Проверка

      if (this.isValidTask() && this.isValidRepeatForm()) {
        this.taskService.updateTask(taskDataUpdate).subscribe({
          next: (response) => {
            console.log('Задача обновлена', response);
            this.clear();
            this.getHomeData();
          },
          error: (error) => {
            console.error('Ошибка при обновлении задачи', error);
          }
        });

        this.taskId = -1;
        this.isDiv1Visible = false; // флаг для невидимости окна создания задачи 
      }  
    }   
  }

  // Удаление задачи
  deleteTask() {
    if (this.taskId !== -1) {
      this.taskService.deleteTask(this.taskId).subscribe({
        next: () => {
          this.clear();
          this.getHomeData();
        },
        error: (error) => {
          console.error('Произошла ошибка при удалении задачи:', error);
        }
      });
    } 
    this.isDiv1Visible = false;
  }
  

  getTaskInfo(event: MouseEvent, taskId: number): void {
    event.preventDefault(); // Предотвращаем стандартное действие
  
    this.taskService.getTaskById(taskId).subscribe((taskInfo: ITask) => {
      this.isDiv1Visible = true;
  
      this.taskId = taskInfo.id;
      this.taskName = taskInfo.name;
      this.taskEstimate = taskInfo.estimate;
      this.taskDescription = taskInfo.description;
      this.startDate = taskInfo.start_date;
      this.stopDate = taskInfo.stop_date;
      this.startTime = taskInfo.start_time;
      this.stopTime = taskInfo.stop_time;
      this.taskStatus = taskInfo.status;
      this.taskCategory = taskInfo.task_category.id;
  
      this.belongsPlan = taskInfo.plan ? String(taskInfo.plan.id) : "choose";
    });
  }
  

  // очистка полей, нужна при закрытии формы задачи
  clear(): void {
    this.taskId = -1;
    this.taskName = '';
    this.taskEstimate = NaN; 
    this.taskDescription = null;
    this.startDate = null;
    this.startTime = null;
    this.taskStatus = 0;
    this.stop = null;
    this.startDate = null;
    this.stopDate = null;
    this.startTime = null;
    this.stopTime = null;
    this.taskCategory = this.categories[0].id;
    this.belongsPlan = "choose";

    // Скрыть форму повторов и убрать галочку
    const checkbox = document.getElementById('chkTest') as HTMLInputElement;
    const panel = document.getElementById('pnlTest') as HTMLElement;
    if (checkbox && panel) {
      checkbox.checked = false;
      panel.style.display = 'none';
    }

    this.repeatForm = {
      repeat_interval: null,
      term: 'week',
      days: [],
      start: '',
      end: '',
      number_of_repeats: 0,
    };
    const buttons = document.querySelectorAll('#daysForWeek button');
    buttons.forEach((btn) => {
      btn.classList.remove('clicked');
    });

    // Очистить все сообщения об ошибках
    const errorFields = [
      "checkEstimate",
      "checkTaskName",
      "checkTimeAndDate",
      "checkDateRange",
      "checkTimeOrder"
    ];

    for (const id of errorFields) {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = "";
      }
    }
    
  }

}  
