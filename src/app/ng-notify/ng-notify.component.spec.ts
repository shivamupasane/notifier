import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNotifyComponent } from './ng-notify.component';

describe('NgNotifyComponent', () => {
  let component: NgNotifyComponent;
  let fixture: ComponentFixture<NgNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgNotifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
