import {Component, Input, NgModule} from '@angular/core'
import {ITodayScreen} from "../../interfaces/today-screen";
import {ITask} from "../../interfaces/task";
import {IClasses} from "../../interfaces/classes";
import { CommonModule } from '@angular/common';
import {todayScreen} from "../../data/today-screen";


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html'
})
export class TimeComponent {
  userTimeZone: string;
  currentDateTime: string;
  @Input() today_screen: ITodayScreen = todayScreen;
  constructor() {
    this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.currentDateTime = new Date().toLocaleString();
  }
}
