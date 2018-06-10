import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbandschartsComponent } from './bbandscharts.component';

describe('BbandschartsComponent', () => {
  let component: BbandschartsComponent;
  let fixture: ComponentFixture<BbandschartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbandschartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbandschartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
