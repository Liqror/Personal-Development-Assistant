import {ITask} from "./task";
import {IClasses} from "./classes";

export interface ITodayScreen {
  today_tasks: ITask[];
  free_tasks: ITask[];
  late_tasks: ITask[];
  day: string;
  text_note: string;
  classes: IClasses[];
}
