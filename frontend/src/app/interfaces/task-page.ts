export interface ITaskPage {
  name: string;
  estimate: number;
  repeat : null,
  status: number;
  timezone: string;
  user_id: number;
  description: string | null;
  start_date: string| null;
  stop_date: string | null;
  start_time: string | null;
  stop_time: string | null;
  task_category: {
    id: number;
  };
}

// POST http://localhost:8080/assistant/api/tasks
