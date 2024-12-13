import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// should be defined somewhere else
// could also be an Enum but I am not 100% sure on whether Angular is enum friendly or not
type TodoStatus = 'Unfinished' | 'Delayed' | 'Completed' | 'Cancelled';

@Component({
  selector: 'app-todo-list-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list-status.component.html',
})
export class TodoListStatusComponent {
  @Input() status: TodoStatus = 'Unfinished';
  @Output() statusChange = new EventEmitter<TodoStatus>();

  // for our dynamic component option rendering (real)
  statuses: TodoStatus[] = ['Unfinished', 'Delayed', 'Completed', 'Cancelled'];

  // also I am pretty sure that our Tailwind code is changing the actual height of the component so this is a
  // TODO: ensure component height stays consistent
  onStatusChange(value: TodoStatus): void {
    this.status = value;
    this.statusChange.emit(value);
  }
}
