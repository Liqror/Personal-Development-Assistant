import { ITask } from "./task";
import { ICategory } from "./category";

export interface IPlan {
    id: number;
    name: string;
    details : string;
    status : number;
    tasks : ITask[];
}

export interface IPlanForCreate {
    user_id: number;
    name: string;
    details : string;
    status : number;
}

export interface IPlanAll {
    id: number;
    name: string;
    details : string;
    status : number;
    tasks : ITaskForPlan[];
    categories: ICategory[],
    user_id: number,
    goal_points: number,
    done_points: number,
}

export interface ITaskForPlan {
    task: {
        id: number;
        name: string;
        status: number;
        start_time: string | null;
        stop_time: string | null;
      };
      step_number: number;
}