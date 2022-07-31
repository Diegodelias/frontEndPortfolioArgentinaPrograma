import { TestBed } from '@angular/core/testing';

import { EduSrvService } from './edu-srv.service';

describe('EduSrvService', () => {
  let service: EduSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
