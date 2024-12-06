import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { DiaryService } from "src/app/services/diary.service"
import { IDiary, IDiaryCreate } from "src/app/interfaces/diary";
import { formatDate } from '@angular/common';
import { formatDate as angularFormatDate } from '@angular/common';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  // public currentRoute: string;
  // это джаваскрипт для изменения расписания
  myScriptElement: HTMLScriptElement;


  diaries: IDiary[] = []; // Все записи дневника
  todayDiary: IDiary | null = null; // Запись на текущий день или null
  todayDate: string; // Форматированная текущая дата
  diaryEntry: string = ''; // Текст для редактирования записи на текущий день

  newDiary: IDiaryCreate = {
    text: "",
    user_id: 1,
    assigned_day: "",
  };


  constructor(private diaryService: DiaryService) {
    // Получение текущей даты в формате YYYY-MM-DD
    this.todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
    this.getDiaries();
  }

  getDiaries(): void {
    this.diaryService.getDiary().subscribe({
      next: (diaries) => {
        this.diaries = diaries.map((diary) => ({
          ...diary,
          formattedDate: this.formatDateForDisplay(diary.assigned_day) // Добавляем отформатированную дату
        }));
  
        const foundTodayDiary = this.diaries.find(
          (diary) => diary.assigned_day === this.todayDate
        );
  
        if (foundTodayDiary) {
          this.todayDiary = foundTodayDiary;
          this.diaryEntry = foundTodayDiary.text;
        } else {
          this.todayDiary = null;
          this.diaryEntry = '';
        }
      },
      error: (error) => {
        console.error('Ошибка при загрузке дневников:', error);
      }
    });
  }
  


  // адаптивная высота поля ввода
  adjustHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Сброс высоты
    textarea.style.height = `${textarea.scrollHeight}px`; // Установка высоты в зависимости от содержимого
  }  

  formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString); // Преобразуем строку в объект Date
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  
    // Преобразуем дату в формат с коротким месяцем
    return date.toLocaleDateString('ru-RU', options).replace('.', ''); // Убираем точку после месяца
  }
  
}
