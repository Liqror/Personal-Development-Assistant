import {Component, Input, NgModule} from '@angular/core'
import {ITodayScreen} from "../../models/today-screen";
import {ITask} from "../../models/task";
import {IClasses} from "../../models/classes";
import { CommonModule } from '@angular/common';
import {todayScreen} from "../../data/today-screen";


@Component({
  selector: 'app-today-screen',
  templateUrl: './today-screen.component.html'
})
export class TodayScreenComponent {
  @Input() today_screen: ITodayScreen = todayScreen;
}
