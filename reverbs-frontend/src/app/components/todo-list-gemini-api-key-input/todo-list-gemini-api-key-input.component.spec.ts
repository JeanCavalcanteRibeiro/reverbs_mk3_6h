import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListGeminiApiKeyInputComponent } from './todo-list-gemini-api-key-input.component';

describe('TodoListGeminiApiKeyInputComponent', () => {
  let component: TodoListGeminiApiKeyInputComponent;
  let fixture: ComponentFixture<TodoListGeminiApiKeyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListGeminiApiKeyInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListGeminiApiKeyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
