import {ITask} from "./task";
import {IClasses} from "./classes";

export interface IHomeData {
  tasks: ITask[];
  day: string;
  text_note: string;
  yesterday_classes: IClasses[];
  today_classes: IClasses[];
  tomorrow_classes: IClasses[];
}
