export interface IDiary {
  id: number;
  text: string;
  user_id: number;
  assigned_day: string;
}

export interface IDiaryCreate {
    text: string;
    user_id: number;
    assigned_day: string;
  }
