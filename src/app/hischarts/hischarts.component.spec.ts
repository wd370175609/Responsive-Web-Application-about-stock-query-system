import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HischartsComponent } from './hischarts.component';

describe('HischartsComponent', () => {
  let component: HischartsComponent;
  let fixture: ComponentFixture<HischartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HischartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HischartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
