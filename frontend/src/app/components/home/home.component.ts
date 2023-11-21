import {Component, Input} from '@angular/core'
import {ITodayScreen} from "../../interfaces/today-screen";
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CalendarComponent} from "../calendar/calendar.component";
import {HomeModule} from "./home.module";

@Component({
  selector: 'app-home',
  // standalone: true,
  // imports: [
  //   HomeModule,
  //   CommonModule
  // ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  // currentDate: Date = new Date();
  currentDate: Date;
  data: ITodayScreen;
  ngOnInit(): void {
    this.currentDate = new Date();
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
}
