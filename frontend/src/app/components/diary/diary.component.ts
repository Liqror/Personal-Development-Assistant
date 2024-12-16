import { OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
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

  // это джаваскрипт для изменения расписания
  myScriptElement: HTMLScriptElement;

  @ViewChild('diaryTextarea') diaryTextarea!: ElementRef<HTMLTextAreaElement>;

  diaries: IDiary[] = []; // Все записи дневника
  todayDiary: IDiary | null = null; // Запись на текущий день или null
  todayDate: string; // Форматированная текущая дата
  diaryEntry: string = ''; // Текст для редактирования записи на текущий день

  constructor(private diaryService: DiaryService) {
    // Получение текущей даты в формате YYYY-MM-DD
    this.todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
    this.getDiaries();
  }

  // получение и раскладывание по полям всех записей
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
        // Устанавливаем высоту textarea после загрузки текста
        setTimeout(() => this.updateTextareaHeight(), 0);
      },
      error: (error) => {
        console.error('Ошибка при загрузке дневников:', error);
      }
    });
  }

  // проверка есть ли запись на сегодня
  onDiaryInput(): void {
    if (this.todayDiary) {
      // Если запись на сегодня существует, обновляем её содержимое на сервере
      this.updateTodayDiary();
    } else if (this.diaryEntry.trim()) {
      // Если записи нет, но пользователь начал ввод текста, создаем запись
      this.createTodayDiary();
    }

    // Обновляем высоту textarea при изменении текста
    this.updateTextareaHeight();
  }

  // обновление в режиме реального времени
  onDiaryBlur(): void {
    if (this.todayDiary) {
      this.updateTodayDiary();
    }
  }

  // создание записи на сегодня
  createTodayDiary(): void {
    const newDiary: IDiaryCreate = {
      text: this.diaryEntry,
      user_id: 1, // Замените ID пользователя когда их будет много
      assigned_day: this.todayDate,
    };

    this.diaryService.createDiary(newDiary).subscribe({
      next: (createdDiary: IDiary) => {  // тип ответа IDiary
        this.todayDiary = createdDiary;  // Теперь присваиваем объект типа IDiary
        // console.log('Новая запись создана:', createdDiary);
      },
      error: (error) => {
        console.error('Ошибка при создании записи:', error);
      }
    });
  }

  // обновление записи на сегодня
  updateTodayDiary(): void {
    if (this.todayDiary) {
      const updatedDiary: IDiary = {
        id: this.todayDiary.id, // Обязательно сохраняем id
        text: this.diaryEntry,  // Новый текст
        user_id: this.todayDiary.user_id, 
        assigned_day: this.todayDiary.assigned_day,  
      };

      this.diaryService.updateDiary(updatedDiary).subscribe({
        next: (response) => {
          this.todayDiary = response; // Обновляем локальную запись после успешного обновления
          // console.log('Запись успешно обновлена:', response);
        },
        error: (error) => {
          console.error('Ошибка при обновлении записи:', error);
        }
      });
    }
  }

  // форматирования вида 2023-12-03 в 3 дек 2023 
  formatDateForDisplay(dateString: string): string {
    const date = new Date(dateString); // Преобразуем строку в объект Date
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  
    // Преобразуем дату в формат с коротким месяцем
    return date.toLocaleDateString('ru-RU', options).replace('.', ''); // Убираем точку после месяца
  }

  // вывод учитывая \n
  formatTextWithLineBreaks(text: string): string {
    return text?.replace(/\n/g, '<br>') || ''; // Заменяем \n на <br>, а также защищаем от пустого текста
  }

  // Устанавливаем высоту текстового поля ввода под текст
  updateTextareaHeight(): void {
    if (!this.diaryTextarea) return;

    const textarea = this.diaryTextarea.nativeElement;
    textarea.style.height = 'auto'; // сбросить текущую высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // установить высоту по контенту
  }
  
}
