import {ITask} from "./task";
import {IClasses} from "./classes";

export interface ICalendarDay {
  tasks: ITask[];
  day: string;
  text_note: string;
  classes: IClasses[];
}
