
export interface IFind {
    entity_types: string[];
    status: 1 | 0 | null;
    text: string | null;
    start_date: string | null; 
    stop_date: string | null;
    done_start_date: string | null;
    done_stop_date: string | null;
    is_repeated: boolean | null;
    belongs_to_plan: boolean | null;
    categories: number[] | null; // в списке обязательно чтото должго быть. это список id
    min_points: number | null;
    max_points: number | null;
}