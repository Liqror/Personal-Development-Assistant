export interface IDay {
    day_by_num_order: number;
    odd_week: IEvent[] | null;
    even_week: IEvent[] | null;
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
    name: string;
    place: string;
    format: string;
    start_time: string;
    stop_time: string;
}

export interface IEventCreate {
    user_id: number;
    week_num: number; // 1 - нечетная, 2 - четная
    day_of_week: number; // 0 - ПН, 1 - ВТ, 2 - СР, 3 - ЧТ, 4 - ПТ, 5 - СБ, 6 - ВС
    name: string;
    place: string;
    format: string; // онлайн/офлайн
    start_time: string;
    stop_time: string;
  }
