import { TestBed } from '@angular/core/testing';

import { SkillSrvService } from './skill-srv.service';

describe('SkillSrvService', () => {
  let service: SkillSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
