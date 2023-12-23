import {ITask} from "./task";
import {IDay} from "./day";
export interface IHomeData {
  yesterday: IDay;
  today: IDay;
  tomorrow: IDay;
  free_tasks: ITask[];
  late_tasks: ITask[];
}
