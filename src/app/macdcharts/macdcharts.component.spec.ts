import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacdchartsComponent } from './macdcharts.component';

describe('MacdchartsComponent', () => {
  let component: MacdchartsComponent;
  let fixture: ComponentFixture<MacdchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacdchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacdchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
