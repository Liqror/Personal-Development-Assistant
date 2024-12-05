import { ITask } from "./task";
import { ICategory } from "./category";


export interface IPlan {
    id: number;
    name: string;
    details : string;
    status : number;
    tasks : ITask[];
    categories: ICategory[],
    user_id: number,
    goal_points: number,
    done_points: number,
}

export interface IPlanCreate {
    user_id: number;
    name: string;
    details : string;
    status : number;
}

export interface IPlanUpdate {
    id: number,
    user_id: number,
    name: string;
    details : string;
    status : number;
}
