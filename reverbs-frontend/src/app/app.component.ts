import { Component } from '@angular/core';
import { TodoListFrameComponent } from './components/todo-list-frame/todo-list-frame.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListFrameComponent],
  template: `
    <app-todo-list-frame></app-todo-list-frame>
  `,
})
export class AppComponent {
  title = 'reverb-frontend :)';

}
