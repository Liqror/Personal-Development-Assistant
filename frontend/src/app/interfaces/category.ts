export interface ICategory {
    user_id: number;
    id: number;
    title: string;
    color: string;
    active: boolean;
}

export interface ICategoryForCreate {
    user_id: number;
    title: string;
    color: string;
    active: boolean;
}