import {Component, Input, NgModule} from '@angular/core'
import {ITodayScreen} from "../../interfaces/today-screen";
import { CommonModule } from '@angular/common';
import {ITask} from "../../interfaces/task";
import { OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CommonModule
  ],
})
export class HomeComponent implements OnInit{
  @Input() today_screen: ITodayScreen;
  data: ITodayScreen;
  ngOnInit(): void {
    this.getTodayScreen();
  }

  // Взаимодействие с бд
  constructor(private http: HttpClient) {
    this.getTodayScreen();
  }
  getTodayScreen(): void {
    this.http.get<ITodayScreen>('http://localhost:8080/assistant/home').subscribe((res: ITodayScreen) => {
      console.log('res', res);
      this.data = res;
    });
  }

  // tasks: ITask[] = todayScreen.free_tasks;

  // onStatusChange(task: ITask): void {
  //   Обработка изменений статуса
  //   При изменении статуса на "Сделано" (status === 1) меняем цвет текста на серый
    // if (task.status === 1) {
    //   task.completed = true; // Можно добавить новое свойство для пометки выполненных задач
    // } else {
    //   task.completed = false;
    // }
  // }

  //
  // getStatusText(status: number): string {
  //   switch (status) {
  //     case 0:
  //       return 'Не сделано';
  //     case 1:
  //       return 'Сделано';
  //     case 2:
  //       return 'Просрочено';
  //     default:
  //       return 'Неизвестный статус';
  //   }
  // }
}
