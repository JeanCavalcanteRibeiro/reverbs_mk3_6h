import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoListInputComponent } from '../todo-list-input/todo-list-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list-frame',
  standalone: true,
  imports: [TodoListItemComponent, TodoListInputComponent, CommonModule],
  templateUrl: './todo-list-frame.component.html',
  styleUrl: './todo-list-frame.component.css',
})
export class TodoListFrameComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }

  addTodo(todoData: { title: string, description?: string }): void {
    const newTodo: Todo = { title: todoData.title, status: 'Unfinished', description: todoData.description };
    this.todoService.addTodo(newTodo).subscribe((todo) => {
      this.todos.push(todo);
    });
  }

  onTodoStatusChanged(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
  }

  onTodoDeleted(id?: number): void {
    // consequences of only having one universal model, easily solveable by actually using the neurons gifted to us by the Great Gemini in the Sky
    if(!id) id = -1
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
