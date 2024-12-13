export interface Todo {
  id?: number; // yep yep just so we can do a dirty cheap create post dont skin me alive
  description?: string; 
  title: string;
  status: 'Unfinished' | 'Delayed' | 'Completed' | 'Cancelled';
}
