export interface ITaskPage {
  id: number;
  name: string;
  description: string | null;
  start_date: string | null;
  start_time: string | null;
  stop_date: string | null;
  stop_time: string | null;
  category_name: string;
  category_color: string;
  estimate: number;
  repeat: string;
}
