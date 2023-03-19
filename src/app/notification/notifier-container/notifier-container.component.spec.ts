import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierContainerComponent } from './notifier-container.component';

describe('NotifierContainerComponent', () => {
  let component: NotifierContainerComponent;
  let fixture: ComponentFixture<NotifierContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifierContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifierContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
