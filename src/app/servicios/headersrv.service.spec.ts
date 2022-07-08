import { TestBed } from '@angular/core/testing';

import { HeadersrvService } from './headersrv.service';

describe('HeadersrvService', () => {
  let service: HeadersrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadersrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
