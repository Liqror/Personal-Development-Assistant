import {ITask} from "./task";
import {IClasses} from "./classes";

export interface ITodayScreen {
  today_tasks: ITask[];
  text_note: string;
  classes: IClasses[];
}
