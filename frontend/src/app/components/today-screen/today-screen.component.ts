import {Component, Input} from '@angular/core'
import {ITodayScreen} from "../../models/today-screen";

@Component({
  selector: 'app-today-screen',
  templateUrl: './today-screen.component.html'
})
export class TodayScreenComponent {
  @Input() today_screen: ITodayScreen
}
