import { TestBed } from '@angular/core/testing';

import { NotifierTimerService } from './notifier-timer.service';

describe('NotifierTimerService', () => {
  let service: NotifierTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifierTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
