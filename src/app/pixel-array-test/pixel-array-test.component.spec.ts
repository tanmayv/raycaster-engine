import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelArrayTestComponent } from './pixel-array-test.component';

describe('PixelArrayTestComponent', () => {
  let component: PixelArrayTestComponent;
  let fixture: ComponentFixture<PixelArrayTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelArrayTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelArrayTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
