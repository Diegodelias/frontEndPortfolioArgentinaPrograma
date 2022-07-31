import { TestBed } from '@angular/core/testing';

import { ProyectossrvService } from './proyectossrv.service';

describe('ProyectossrvService', () => {
  let service: ProyectossrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectossrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
