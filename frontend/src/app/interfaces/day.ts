import {ITask} from "./task";
import {IEvent} from "./timetable";
import {INote} from "./note";


export interface IDay {
  date: string;
  fixed_tasks: ITask[];
  done_tasks: ITask[];
  text_note: INote;
  day_classes: IEvent[];
}
