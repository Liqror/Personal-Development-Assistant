import { IPlan } from "./plan";


export interface ITask {
    id: number;
    name: string;
    estimate: number;
    repeat : null;
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
    plan: IPlan | null;
}

export interface ITaskCreate {
  name: string;
  estimate: number;
  repeat : null;
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
  plan: IPlan | null;
}

export interface IShortTask {
  id: number;
  name: string;
  status: number;
  start_time: string | null;
  stop_time: string | null;
}
