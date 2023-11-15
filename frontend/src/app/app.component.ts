import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ITodayScreen} from "./interfaces/today-screen";
import {todayScreen} from "./data/today-screen";
import {HomeComponent} from "./components/home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ассистент по Саморазвитию';
  today_screen: ITodayScreen = todayScreen;

  constructor(private http: HttpClient) {}

  getTask(): void {
    this.http.get('http://localhost:8080/assistant/task').subscribe(res => {
      console.log('res', res)
    })
  }
}
