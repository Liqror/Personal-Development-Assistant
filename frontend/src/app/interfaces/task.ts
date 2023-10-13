export interface ITask {
  id: number;
  name: string;
  status: number;
  start_time: string | null;
  stop_time: string | null;
}
