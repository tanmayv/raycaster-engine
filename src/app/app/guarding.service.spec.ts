import { TestBed } from '@angular/core/testing';

import { GuardingService } from './guarding.service';

describe('GuardingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardingService = TestBed.get(GuardingService);
    expect(service).toBeTruthy();
  });
});
