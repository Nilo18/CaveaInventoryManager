import { TestBed } from '@angular/core/testing';

import { BaseUrlHolderService } from './base-url-holder-service';

describe('BaseUrlHolderService', () => {
  let service: BaseUrlHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseUrlHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
