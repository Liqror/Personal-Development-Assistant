import {ITask} from "./task";
import {IClasses} from "./classes";
import {INote} from "./note";


export interface IDay {
  date: string;
  fixed_tasks: ITask[];
  done_tasks: ITask[];
  text_note: INote;
  day_classes: IClasses[];
}
