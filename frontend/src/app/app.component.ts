import { Component } from '@angular/core';
import {ITodayScreen} from "./interfaces/today-screen";
import {todayScreen} from "./data/today-screen";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ассистент по Саморазвитию';
  today_screen: ITodayScreen = todayScreen;
}
