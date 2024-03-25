import { ITask } from "./task";

export interface IPlan {
    id: number;
    name: string;
    details : string;
    status : number;
    tasks : ITask[];
}
  