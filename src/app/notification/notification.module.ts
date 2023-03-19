import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierContainerComponent } from './notifier-container/notifier-container.component';
import { NotifierQueueService } from './notifier-queue.service';
import {NotifierService} from './notifier.service';
import { NotifierNotificationComponent } from './notifier-notification/notifier-notification.component';
import { NotifierTimerService } from './notifier-timer.service';
import { NotifierAnimationService } from './notifier-animation.service';
import { NotifierConfigToken } from './NotifierConfig';


@NgModule({
  declarations: [
    NotifierContainerComponent,
    NotifierNotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[NotifierNotificationComponent],
  providers: [NotifierQueueService, NotifierService, NotifierTimerService, NotifierAnimationService]
})
export class NotificationModule { }
