import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricechartsComponent } from './pricecharts.component';

describe('PricechartsComponent', () => {
  let component: PricechartsComponent;
  let fixture: ComponentFixture<PricechartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricechartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
