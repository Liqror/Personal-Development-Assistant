import { IPlan } from "./plan";


export interface ITask {
    id: number;
    name: string;
    estimate: number;
    status: number;
    timezone: string;
    user_id: number;
    description: string | null;
    start_date: string| null;
    stop_date: string | null;
    start_time: string | null;
    stop_time: string | null;
    task_category: {
        id: number;
    };
    plan_id: number | null; // это поле для связывания задачи и плана
    plan: IPlan | null; // это поле для просмотра подробностей плана к которому принадлежит задача
    repeat : null | IRepeat;
}

export interface IRepeat {
  repeat_interval: null | number,
  term: string,
  days: number[], 
  start: string,  // из старт тайм выше
  end: string,
  number_of_repeats: number  // если задача никогда не заканчивается то енд нал и намбер оф репится 0 
}

export interface ITaskCreate {
  name: string;
  estimate: number;
  status: number;
  timezone: string;
  user_id: number;
  description: string | null;
  start_date: string| null;
  stop_date: string | null;
  start_time: string | null;
  stop_time: string | null;
  task_category: {
    id: number;
  };
  plan_id: number | null; // это поле для связывания задачи и плана
  plan: IPlan | null; // это поле для просмотра подробностей плана к которому принадлежит задача
  repeat : null | IRepeat;
}

export interface IShortTask {
  id: number;
  name: string;
  status: number;
  start_time: string | null;
  stop_time: string | null;
}
