import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListStatusComponent } from '../todo-list-status/todo-list-status.component';
import { TodoService } from '../../services/todo.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-todo-list-item',
  standalone: true,
  imports: [CommonModule, TodoListStatusComponent, FormsModule],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css',
})
export class TodoListItemComponent {
  // WARNING: Not Safe For Work! NEVER do this!!!!!! never. but since this is planned for friday the 13th it makes sense, kinda
  apiKey: string | null = null;
  isEditingTitle = false;
  editedTitle: string = '';
  doesKeyExist: boolean = false;

  @Input() todo!: Todo;
  @Output() statusChanged = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  constructor(
    private sanitizer: DomSanitizer,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.apiKey = localStorage.getItem('apiKey');
    if (this.apiKey) this.doesKeyExist = true;
    this.editedTitle = this.todo.title;
  }

  onStatusChange(
    newStatus: 'Unfinished' | 'Delayed' | 'Completed' | 'Cancelled'
  ): void {
    this.todo.status = newStatus;
    this.statusChanged.emit(this.todo);
  }

  onDelete(): void {
    this.delete.emit(this.todo);
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  generateDescription(): void {
    if (this.apiKey) {
      this.todoService
        .generateDescription(this.todo.title, this.apiKey)
        .subscribe((response) => {
          this.todo.description = response.description;
          this.statusChanged.emit(this.todo);
        });
    }
  }

  saveTitleEdit(): void {
    if (this.editedTitle.trim()) {
      this.todo.title = this.editedTitle;
      this.statusChanged.emit(this.todo);
    }
    this.isEditingTitle = false;
  }
}
