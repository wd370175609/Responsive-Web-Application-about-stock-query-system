import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdxchartsComponent } from './adxcharts.component';

describe('AdxchartsComponent', () => {
  let component: AdxchartsComponent;
  let fixture: ComponentFixture<AdxchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdxchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdxchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
