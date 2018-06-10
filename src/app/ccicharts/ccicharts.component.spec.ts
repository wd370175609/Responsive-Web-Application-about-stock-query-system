import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcichartsComponent } from './ccicharts.component';

describe('CcichartsComponent', () => {
  let component: CcichartsComponent;
  let fixture: ComponentFixture<CcichartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcichartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcichartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
