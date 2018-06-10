import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmachartsComponent } from './emacharts.component';

describe('EmachartsComponent', () => {
  let component: EmachartsComponent;
  let fixture: ComponentFixture<EmachartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmachartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmachartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
