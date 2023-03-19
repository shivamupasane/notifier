import { Injectable } from '@angular/core';
/**
 * Fade animation preset
 */
const fade = {
  hide: () => {
      return {
          from: {
              opacity: '1',
          },
          to: {
              opacity: '0',
          },
      };
  },
  show: () => {
      return {
          from: {
              opacity: '0',
          },
          to: {
              opacity: '1',
          },
      };
  },
};

/**
* Slide animation preset
*/
const slide = {
  hide: (notification: any) => {
      // Prepare variables
      const config = notification.component.getConfig();
      const shift = notification.component.getShift();
      let from;
      let to;
      // Configure variables, depending on configuration and component
      if (config.position.horizontal.position === 'left') {
          from = {
              transform: `translate3d( 0, ${shift}px, 0 )`,
          };
          to = {
              transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), ${shift}px, 0 )`,
          };
      }
      else if (config.position.horizontal.position === 'right') {
          from = {
              transform: `translate3d( 0, ${shift}px, 0 )`,
          };
          to = {
              transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), ${shift}px, 0 )`,
          };
      }
      else {
          let horizontalPosition;
          if (config.position.vertical.position === 'top') {
              horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
          }
          else {
              horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
          }
          from = {
              transform: `translate3d( -50%, ${shift}px, 0 )`,
          };
          to = {
              transform: `translate3d( -50%, ${horizontalPosition}, 0 )`,
          };
      }
      // Done
      return {
          from,
          to,
      };
  },
  show: (notification: any) => {
      // Prepare variables
      const config = notification.component.getConfig();
      let from;
      let to;
      // Configure variables, depending on configuration and component
      if (config.position.horizontal.position === 'left') {
          from = {
              transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), 0, 0 )`,
          };
          to = {
              transform: 'translate3d( 0, 0, 0 )',
          };
      }
      else if (config.position.horizontal.position === 'right') {
          from = {
              transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), 0, 0 )`,
          };
          to = {
              transform: 'translate3d( 0, 0, 0 )',
          };
      }
      else {
          let horizontalPosition;
          if (config.position.vertical.position === 'top') {
              horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
          }
          else {
              horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
          }
          from = {
              transform: `translate3d( -50%, ${horizontalPosition}, 0 )`,
          };
          to = {
              transform: 'translate3d( -50%, 0, 0 )',
          };
      }
      // Done
      return {
          from,
          to,
      };
  },
};
@Injectable({
  providedIn: 'root'
})
export class NotifierAnimationService {
  private animationPresets: any;
  constructor() {
    this.animationPresets = {
    fade,
    slide,
}; }
/**
     * Get animation data
     *
     * This method generates all data the Web Animations API needs to animate our notification. The result depends on both the animation
     * direction (either in or out) as well as the notifications (and its attributes) itself.
     *
     * @param   direction    Animation direction, either in or out
     * @param   notification Notification the animation data should be generated for
     * @returns Animation information
     */
getAnimationData(direction:any, notification:any) {
  // Get all necessary animation data
  let keyframes;
  let duration;
  let easing;
  if (direction === 'show') {
      keyframes = this.animationPresets[notification.component.getConfig().animations.show.preset].show(notification);
      duration = notification.component.getConfig().animations.show.speed;
      easing = notification.component.getConfig().animations.show.easing;
  }
  else {
      keyframes = this.animationPresets[notification.component.getConfig().animations.hide.preset].hide(notification);
      duration = notification.component.getConfig().animations.hide.speed;
      easing = notification.component.getConfig().animations.hide.easing;
  }
  // Build and return animation data
  return {
      keyframes: [keyframes.from, keyframes.to],
      options: {
          duration,
          easing,
          fill: 'forwards', // Keep the newly painted state after the animation finished
      },
  };
}
}
