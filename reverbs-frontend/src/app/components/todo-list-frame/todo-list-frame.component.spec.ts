import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListFrameComponent } from './todo-list-frame.component';

describe('TodoListFrameComponent', () => {
  let component: TodoListFrameComponent;
  let fixture: ComponentFixture<TodoListFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
