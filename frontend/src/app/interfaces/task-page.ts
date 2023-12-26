export interface ITaskPage {
  user_id: number;
  name: string;
  description: string | null;
  estimate: number;
  task_category: {
    id: number;
  };
  start_date: string;
  stop_date: string | null;
  start_time: string | null;
  stop_time: string | null;
  timezone: string;
  status: number;
}

// POST http://localhost:8080/assistant/api/tasks
