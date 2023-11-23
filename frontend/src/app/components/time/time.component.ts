import {Component} from '@angular/core'




@Component({
  selector: 'app-time',
  templateUrl: './time.component.html'
})
export class TimeComponent {
  userTimeZone: string;
  currentDateTime: string;

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

    // год месяц день

    // @ts-ignore
    this.http.post(backendUrl, dataToSend).subscribe(response => {
      console.log('Backend response:', response);
    });
  }

}
