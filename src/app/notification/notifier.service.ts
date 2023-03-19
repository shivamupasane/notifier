import { Injectable } from '@angular/core';
import { NotifierQueueService } from './notifier-queue.service';
import { NotifierConfig, NotifierConfigToken } from './NotifierConfig';
/**
 * Notifier service
 *
 * This service provides access to the public notifier API. Once injected into a component, directive, pipe, service, or any other building
 * block of an applications, it can be used to show new notifications, and hide existing ones. Internally, it transforms API calls into
 * actions, which then get thrown into the action queue - eventually being processed at the right moment.
 */
@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private config : any = undefined;
  constructor(private queueService: NotifierQueueService) { }
   /**
     * Get the notifier configuration
     *
     * @returns Notifier configuration
     */
   getConfig() {
    return this.config;
}
/**
 * Get the observable for handling actions
 *
 * @returns Observable of NotifierAction
 */
get actionStream() {
    return this.queueService.actionStream.asObservable();
}
/**
 * API: Show a new notification
 *
 * @param notificationOptions Notification options
 */
show(notificationOptions: any) {
    this.queueService.push({
        payload: notificationOptions,
        type: 'SHOW',
    });
}
/**
 * API: Hide a specific notification, given its ID
 *
 * @param notificationId ID of the notification to hide
 */
hide(notificationId: any) {
    this.queueService.push({
        payload: notificationId,
        type: 'HIDE',
    });
}
/**
 * API: Hide the newest notification
 */
hideNewest() {
    this.queueService.push({
        type: 'HIDE_NEWEST',
    });
}
/**
 * API: Hide the oldest notification
 */
hideOldest() {
    this.queueService.push({
        type: 'HIDE_OLDEST',
    });
}
/**
 * API: Hide all notifications at once
 */
hideAll() {
    this.queueService.push({
        type: 'HIDE_ALL',
    });
}
/**
 * API: Shortcut for showing a new notification
 *
 * @param type             Type of the notification
 * @param message          Message of the notification
 * @param [notificationId] Unique ID for the notification (optional)
 */
notify(type: any, message: any, notificationId:any) {
    const notificationOptions = {
        message,
        type,
        id: null
    };
    if (notificationId !== undefined) {
        notificationOptions.id = notificationId;
    }
    this.show(notificationOptions);
}
}
