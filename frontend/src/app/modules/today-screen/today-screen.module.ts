import {Component, Input, NgModule} from '@angular/core'
import {ITodayScreen} from "../../interfaces/today-screen";
import { CommonModule } from '@angular/common';
import {todayScreen} from "../../data/today-screen";
import {ITask} from "../../interfaces/task";
import {TodayScreenComponent} from "../../components/today-screen/today-screen.component";


@NgModule({
  imports: [CommonModule],
  declarations: [
    // TodayScreenComponent
  ]
})
export class TodayScreenModule {
  @Input() today_screen: ITodayScreen = todayScreen;
  tasks: ITask[] = todayScreen.free_tasks;

  // onStatusChange(task: ITask): void {
  //   Обработка изменений статуса
  //   При изменении статуса на "Сделано" (status === 1) меняем цвет текста на серый
  // if (task.status === 1) {
  //   task.completed = true; // Можно добавить новое свойство для пометки выполненных задач
  // } else {
  //   task.completed = false;
  // }
  // }


  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Не сделано';
      case 1:
        return 'Сделано';
      case 2:
        return 'Просрочено';
      default:
        return 'Неизвестный статус';
    }
  }
}
