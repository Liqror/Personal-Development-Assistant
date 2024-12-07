export interface IEventForTimetable {
    id: number;
    name: string;
    place: string;
    format: string;
    start_time: string;
    stop_time: string;
}
  
export interface IDay {
    day_by_num_order: number;
    odd_week: IEventForTimetable[] | null;
    even_week: IEventForTimetable[] | null;
}
  
export interface ITimetable {
    days: IDay[];
    weeks_num: number;
}

export interface IEvent {
    id: number;
    user_id: number;
    week_num: number;
    day_of_week: number;
    event_name: string;
    place: string;
    format: string;
    start_time: string;
    stop_time: string;
}

export interface IEventCreate {
    user_id: number;
    week_num: number;
    day_of_week: number;
    event_name: string;
    place: string;
    format: string;
    start_time: string;
    stop_time: string;
}
