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

  sendDataToBackend() {
    const dataToSend = {
      userTimeZone: this.userTimeZone,
      currentDateTime: this.currentDateTime,
    };

    // Замените URL ниже на ваш фактический бекенд URL
    const backendUrl = 'http://localhost:8080/assistant/user_time';

    // @ts-ignore
    this.http.post(backendUrl, dataToSend).subscribe(response => {
      console.log('Backend response:', response);
    });
  }

}
