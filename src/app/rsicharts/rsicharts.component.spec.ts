import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsichartsComponent } from './rsicharts.component';

describe('RsichartsComponent', () => {
  let component: RsichartsComponent;
  let fixture: ComponentFixture<RsichartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsichartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsichartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
