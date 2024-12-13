import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListInputComponent } from './todo-list-input.component';

describe('TodoListInputComponent', () => {
  let component: TodoListInputComponent;
  let fixture: ComponentFixture<TodoListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
