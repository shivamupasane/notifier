import { TestBed } from '@angular/core/testing';

import { NotifierAnimationService } from './notifier-animation.service';

describe('NotifierAnimationService', () => {
  let service: NotifierAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifierAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
