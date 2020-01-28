import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaycasterComponent } from './raycaster.component';

describe('RaycasterComponent', () => {
  let component: RaycasterComponent;
  let fixture: ComponentFixture<RaycasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaycasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaycasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
