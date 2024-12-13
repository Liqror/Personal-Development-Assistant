import {IShortTask} from "./task";
import {IEvent} from "./timetable";
import {INote} from "./note";


export interface IHomeData {
  yesterday: IDay;
  today: IDay;
  tomorrow: IDay;
  free_tasks: IShortTask[];
  late_tasks: IShortTask[];
  soon_tasks: IShortTask[];
}

export interface IDay {
  date: string;
  fixed_tasks: IShortTask[];
  done_tasks: IShortTask[];
  text_note: INote;
  day_classes: IEvent[];
}
