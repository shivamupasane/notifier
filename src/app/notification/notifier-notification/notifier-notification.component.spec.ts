import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierNotificationComponent } from './notifier-notification.component';

describe('NotifierNotificationComponent', () => {
  let component: NotifierNotificationComponent;
  let fixture: ComponentFixture<NotifierNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifierNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifierNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
