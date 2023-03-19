import { TestBed } from '@angular/core/testing';

import { NotifierQueueService } from './notifier-queue.service';

describe('NotifierQueueService', () => {
  let service: NotifierQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifierQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
