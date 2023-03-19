import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { NotifierAnimationService } from '../notifier-animation.service';
import { NotifierTimerService } from '../notifier-timer.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onNotificationClick()',
    '(mouseout)': 'onNotificationMouseout()',
    '(mouseover)': 'onNotificationMouseover()',
    class: 'notifier__notification'
  },
  selector: 'app-notifier-notification',
  template: "<ng-container\n  *ngIf=\"notification.template; else predefinedNotification\"\n  [ngTemplateOutlet]=\"notification.template\"\n  [ngTemplateOutletContext]=\"{ notification: notification }\"\n>\n</ng-container>\n\n<ng-template #predefinedNotification>\n  <p class=\"notifier__notification-message\">{{ notification.message }}</p>\n  <button\n    class=\"notifier__notification-button\"\n    type=\"button\"\n    title=\"dismiss\"\n    *ngIf=\"config.behaviour.showDismissButton\"\n    (click)=\"onClickDismiss()\"\n  >\n    <svg class=\"notifier__notification-button-icon\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\">\n      <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n    </svg>\n  </button>\n</ng-template>\n",
  styleUrls: ['./notifier-notification.component.scss']
})
/**
 * Notifier notification component
 * -------------------------------
 * This component is responsible for actually displaying the notification on screen. In addition, it's able to show and hide this
 * notification, in particular to animate this notification in and out, as well as shift (move) this notification vertically around.
 * Furthermore, the notification component handles all interactions the user has with this notification / component, such as clicks and
 * mouse movements.
 */
export class NotifierNotificationComponent implements OnInit, AfterViewInit {
  public config: any;
  @Input() notification: any;
  @Output() ready = new EventEmitter();
  @Output() dismiss = new EventEmitter();
  private element: any;
  private elementShift:number = 0;
  private elementHeight: any;
  private elementWidth:any;
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private timerService: NotifierTimerService, private animationService: NotifierAnimationService) {
    this.element = this.elementRef.nativeElement;
    this.elementShift = 0;
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.setup();
    this.elementHeight = this.element.offsetHeight;
    this.elementWidth = this.element.offsetWidth;
    this.ready.emit(this);
}
/**
     * Get the notifier config
     *
     * @returns Notifier configuration
     */
getConfig() {
  return this.config;
}
/**
* Get notification element height (in px)
*
* @returns Notification element height (in px)
*/
getHeight() {
  return this.elementHeight;
}
/**
* Get notification element width (in px)
*
* @returns Notification element height (in px)
*/
getWidth() {
  return this.elementWidth;
}
/**
* Get notification shift offset (in px)
*
* @returns Notification element shift offset (in px)
*/
getShift() {
  return this.elementShift;
}
/**
* Show (animate in) this notification
*
* @returns Promise, resolved when done
*/
show(): Promise<void> {
  return new Promise((resolve) => {
      // Are animations enabled?
      if (this.config.animations.enabled && this.config.animations.show.speed > 0) {
          // Get animation data
          const animationData = this.animationService.getAnimationData('show', this.notification);
          // Set initial styles (styles before animation), prevents quick flicker when animation starts
          const animatedProperties = Object.keys(animationData.keyframes[0]);
          for (let i = animatedProperties.length - 1; i >= 0; i--) {
              this.renderer.setStyle(this.element, animatedProperties[i], animationData.keyframes[0][animatedProperties[i]]);
          }
          // Animate notification in
          this.renderer.setStyle(this.element, 'visibility', 'visible');
          const animation = this.element.animate(animationData.keyframes, animationData.options);
          animation.onfinish = () => {
              this.startAutoHideTimer();
              resolve(); // Done
          };
      }
      else {
          // Show notification
          this.renderer.setStyle(this.element, 'visibility', 'visible');
          this.startAutoHideTimer();
          resolve(); // Done
      }
  });
}
/**
* Hide (animate out) this notification
*
* @returns Promise, resolved when done
*/
hide(): Promise<void> {
  return new Promise((resolve) => {
      this.stopAutoHideTimer();
      // Are animations enabled?
      if (this.config.animations.enabled && this.config.animations.hide.speed > 0) {
          const animationData = this.animationService.getAnimationData('hide', this.notification);
          const animation = this.element.animate(animationData.keyframes, animationData.options);
          animation.onfinish = () => {
              resolve(); // Done
          };
      }
      else {
          resolve(); // Done
      }
  });
}
/**
* Shift (move) this notification
*
* @param   distance         Distance to shift (in px)
* @param   shiftToMakePlace Flag, defining in which direction to shift
* @returns Promise, resolved when done
*/
shift(distance: any, shiftToMakePlace:any): Promise<void> {
  return new Promise((resolve) => {
      // Calculate new position (position after the shift)
      let newElementShift;
      if ((this.config.position.vertical.position === 'top' && shiftToMakePlace) ||
          (this.config.position.vertical.position === 'bottom' && !shiftToMakePlace)) {
          newElementShift = this.elementShift + distance + this.config.position.vertical.gap;
      }
      else {
          newElementShift = this.elementShift - distance - this.config.position.vertical.gap;
      }
      const horizontalPosition = this.config.position.horizontal.position === 'middle' ? '-50%' : '0';
      // Are animations enabled?
      if (this.config.animations.enabled && this.config.animations.shift.speed > 0) {
          const animationData = {
              // TODO: Extract into animation service
              keyframes: [
                  {
                      transform: `translate3d( ${horizontalPosition}, ${this.elementShift}px, 0 )`,
                  },
                  {
                      transform: `translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`,
                  },
              ],
              options: {
                  duration: this.config.animations.shift.speed,
                  easing: this.config.animations.shift.easing,
                  fill: 'forwards',
              },
          };
          this.elementShift = newElementShift;
          const animation = this.element.animate(animationData.keyframes, animationData.options);
          animation.onfinish = () => {
              resolve(); // Done
          };
      }
      else {
          this.renderer.setStyle(this.element, 'transform', `translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`);
          this.elementShift = newElementShift;
          resolve(); // Done
      }
  });
}
/**
* Handle click on dismiss button
*/
onClickDismiss() {
  this.dismiss.emit(this.notification.id);
}
/**
* Handle mouseover over notification area
*/
onNotificationMouseover() {
  if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
      this.pauseAutoHideTimer();
  }
  else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
      this.stopAutoHideTimer();
  }
}
/**
* Handle mouseout from notification area
*/
onNotificationMouseout() {
  if (this.config.behaviour.onMouseover === 'pauseAutoHide') {
      this.continueAutoHideTimer();
  }
  else if (this.config.behaviour.onMouseover === 'resetAutoHide') {
      this.startAutoHideTimer();
  }
}
/**
* Handle click on notification area
*/
onNotificationClick() {
  if (this.config.behaviour.onClick === 'hide') {
      this.onClickDismiss();
  }
}
/**
* Start the auto hide timer (if enabled)
*/
startAutoHideTimer() {
  if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.start(this.config.behaviour.autoHide).then(() => {
          this.onClickDismiss();
      });
  }
}
/**
* Pause the auto hide timer (if enabled)
*/
pauseAutoHideTimer() {
  if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.pause();
  }
}
/**
* Continue the auto hide timer (if enabled)
*/
continueAutoHideTimer() {
  if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.continue();
  }
}
/**
* Stop the auto hide timer (if enabled)
*/
stopAutoHideTimer() {
  if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.stop();
  }
}
/**
* Initial notification setup
*/
setup() {
  // Set start position (initially the exact same for every new notification)
  if (this.config.position.horizontal.position === 'left') {
      this.renderer.setStyle(this.element, 'left', `${this.config.position.horizontal.distance}px`);
  }
  else if (this.config.position.horizontal.position === 'right') {
      this.renderer.setStyle(this.element, 'right', `${this.config.position.horizontal.distance}px`);
  }
  else {
      this.renderer.setStyle(this.element, 'left', '50%');
      // Let's get the GPU handle some work as well (#perfmatters)
      this.renderer.setStyle(this.element, 'transform', 'translate3d( -50%, 0, 0 )');
  }
  if (this.config.position.vertical.position === 'top') {
      this.renderer.setStyle(this.element, 'top', `${this.config.position.vertical.distance}px`);
  }
  else {
      this.renderer.setStyle(this.element, 'bottom', `${this.config.position.vertical.distance}px`);
  }
  // Add classes (responsible for visual design)
  this.renderer.addClass(this.element, `notifier__notification--${this.notification.type}`);
  this.renderer.addClass(this.element, `notifier__notification--${this.config.theme}`);
}
}