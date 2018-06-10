import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmachartsComponent } from './smacharts.component';

describe('SmachartsComponent', () => {
  let component: SmachartsComponent;
  let fixture: ComponentFixture<SmachartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmachartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmachartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
