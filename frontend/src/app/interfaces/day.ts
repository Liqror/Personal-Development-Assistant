import {ITask} from "./task";
import {IClasses} from "./classes";
export interface IDay {
  date: string;
  fixed_tasks: ITask[];
  done_tasks: ITask[];
  text_note: string;
  day_classes: IClasses[];
}
