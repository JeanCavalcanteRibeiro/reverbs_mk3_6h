import {
  Component,
  Output,
  EventEmitter,
  SecurityContext,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
// the future is here. truly a sight for sore eyes
import { DomSanitizer } from '@angular/platform-browser';
import { TodoListGeminiApiKeyInputComponent } from '../todo-list-gemini-api-key-input/todo-list-gemini-api-key-input.component';
@Component({
  selector: 'app-todo-list-input',
  imports: [FormsModule, TodoListGeminiApiKeyInputComponent],
  templateUrl: './todo-list-input.component.html',
  styleUrl: './todo-list-input.component.css',
})
export class TodoListInputComponent {
  newTodoTitle = '';
  newTodoDescription = '';
  doesKeyExist = false;

  @Output() addTodo = new EventEmitter<{
    title: string;
    description?: string;
  }>();

  constructor(private sanitizer: DomSanitizer) {}

  onAddTodo(): void {
    const title = this.newTodoTitle.trim();
    const description = this.newTodoDescription.trim();

    if (title) {
      this.addTodo.emit({
        title: title,
        description: description ? description : undefined,
      });

      this.newTodoTitle = '';
      this.newTodoDescription = '';
    }
  }
  onApiKeySet(apiKey: string): void {
    // does nothing since our precious, precious key is forever locked away into our browsers memory, completely unencrypted!
    // this.doesKeyExist = true;
  }
}
