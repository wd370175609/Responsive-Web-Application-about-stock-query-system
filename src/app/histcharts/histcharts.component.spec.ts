import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistchartsComponent } from './histcharts.component';

describe('HistchartsComponent', () => {
  let component: HistchartsComponent;
  let fixture: ComponentFixture<HistchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
