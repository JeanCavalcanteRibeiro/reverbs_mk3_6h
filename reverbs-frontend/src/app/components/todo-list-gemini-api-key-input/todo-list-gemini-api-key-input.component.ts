import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list-gemini-api-key-input',
  imports: [FormsModule],
  templateUrl: './todo-list-gemini-api-key-input.component.html',
  styleUrl: './todo-list-gemini-api-key-input.component.css'
})
export class TodoListGeminiApiKeyInputComponent {
  apiKey: string = '';
  @Output() apiKeySet = new EventEmitter<string>();

  saveApiKey(): void {
    this.apiKeySet.emit(this.apiKey);
    localStorage.setItem('apiKey', this.apiKey);
  }
}
