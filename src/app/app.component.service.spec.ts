import { TestBed, inject } from '@angular/core/testing';

import { AutoCompleteService } from './app.component.service';

describe('AutoCompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoCompleteService]
    });
  });

  it('should be created', inject([AutoCompleteService], (service: AutoCompleteService) => {
    expect(service).toBeTruthy();
  }));
});
