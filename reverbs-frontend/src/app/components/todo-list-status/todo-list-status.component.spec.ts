import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListStatusComponent } from './todo-list-status.component';

describe('TodoListStatusComponent', () => {
  let component: TodoListStatusComponent;
  let fixture: ComponentFixture<TodoListStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
