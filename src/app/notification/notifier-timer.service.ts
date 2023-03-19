import { Injectable } from '@angular/core';
/**
 * Notifier timer service
 *
 * This service acts as a timer, needed due to the still rather limited setTimeout JavaScript API. The timer service can start and stop a
 * timer. Furthermore, it can also pause the timer at any time, and resume later on. The timer API workd promise-based.
 */
@Injectable({
  providedIn: 'root'
})
export class NotifierTimerService {
 private now: number = 0;
 private remaining: number = 0;
 private finishPromiseResolver: any;
 private timerId: any;
  constructor() { }
   /**
     * Start (or resume) the timer
     *
     * @param   duration Timer duration, in ms
     * @returns          Promise, resolved once the timer finishes
     */
   start(duration:any) {
    return new Promise((resolve) => {
        // For the first run ...
        this.remaining = duration;
        // Setup, then start the timer
        this.finishPromiseResolver = resolve;
        this.continue();
    });
}
/**
 * Pause the timer
 */
pause() {
    clearTimeout(this.timerId);
    this.remaining -= new Date().getTime() - this.now;
}
/**
 * Continue the timer
 */
continue() {
    this.now = new Date().getTime();
    this.timerId = window.setTimeout(() => {
        this.finish();
    }, this.remaining);
}
/**
 * Stop the timer
 */
stop() {
    clearTimeout(this.timerId);
    this.remaining = 0;
}
/**
 * Finish up the timeout by resolving the timer promise
 */
finish() {
    this.finishPromiseResolver();
}
}
