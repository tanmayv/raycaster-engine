import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDemoComponent } from './game-demo.component';

describe('GameDemoComponent', () => {
  let component: GameDemoComponent;
  let fixture: ComponentFixture<GameDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
