import { TestBed } from '@angular/core/testing';

import { AdminDBSService } from './adminDBS.service';

describe('Admin', () => {
  let service: AdminDBSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDBSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
