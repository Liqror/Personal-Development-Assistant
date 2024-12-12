import { IShortTask } from "./task";
import { ICategory } from "./category";


export interface IPlan {
    id: number;
    name: string;
    details : string;
    status : number;
    tasks : IShortTask[];
    categories: ICategory[],
    user_id: number,
    start_date: string;
    stop_date: string;
    goal_points: number,
    done_points: number,
}

export interface IPlanCreate {
    user_id: number;
    name: string;
    details: string;
    start_date: string;
    stop_date: string;
    status : number;
}

export interface IPlanUpdate {
    id: number;
    user_id: number;
    name: string;
    details : string;
    start_date: string;
    stop_date: string;
    status : number;
}
