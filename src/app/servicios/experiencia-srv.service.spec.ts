import { TestBed } from '@angular/core/testing';

import { ExperienciaSrvService } from './experiencia-srv.service';

describe('ExperienciaSrvService', () => {
  let service: ExperienciaSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienciaSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
