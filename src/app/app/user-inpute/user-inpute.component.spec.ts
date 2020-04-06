import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputeComponent } from './user-inpute.component';

describe('UserInputeComponent', () => {
  let component: UserInputeComponent;
  let fixture: ComponentFixture<UserInputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
