export interface INote {    
    id: number;
    user_id: number;
    assigned_day: string;
    text: string;
}

export interface INoteForCreate {
    user_id: number;
    assigned_day: string;
    text: string;
}
