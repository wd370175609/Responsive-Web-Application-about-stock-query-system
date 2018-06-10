import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StochchartsComponent } from './stochcharts.component';

describe('StochchartsComponent', () => {
  let component: StochchartsComponent;
  let fixture: ComponentFixture<StochchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StochchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StochchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
