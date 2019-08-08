import { TestBed } from '@angular/core/testing';

import { EnrollmentService } from './enrollment.service';

describe('EnrollmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrollmentService = TestBed.get(EnrollmentService);
    expect(service).toBeTruthy();
  });
});
