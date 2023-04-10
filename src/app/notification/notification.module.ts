import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NotifierConfig, NotifierOptions } from './models/notifier-config.model';
import { NotifierAnimationService } from './notifier-animation.service';
import { NotifierContainerComponent } from './notifier-container/notifier-container.component';
import { NotifierNotificationComponent } from './notifier-notification/notifier-notification.component';
import { NotifierQueueService } from './notifier-queue.service';
import { NotifierService } from './notifier.service';
import { NotifierConfigToken, NotifierOptionsToken } from './notifier.tokens';

/**
 * Factory for a notifier configuration with custom options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @param   options - Custom notifier options
 * @returns - Notifier configuration as result
 */
export function notifierCustomConfigFactory(options: NotifierOptions): NotifierConfig {
  return new NotifierConfig(options);
}

/**
 * Factory for a notifier configuration with default options
 *
 * Sidenote:
 * Required as Angular AoT compilation cannot handle dynamic functions; see <https://github.com/angular/angular/issues/11262>.
 *
 * @returns - Notifier configuration as result
 */
export function notifierDefaultConfigFactory(): NotifierConfig {
  return new NotifierConfig({});
}

/**
 * Notifier module
 */
@NgModule({
  declarations: [NotifierContainerComponent, NotifierNotificationComponent],
  exports: [NotifierContainerComponent],
  imports: [CommonModule],
  providers: [
    NotifierAnimationService,
    NotifierService,
    NotifierQueueService,

    // Provide the default notifier configuration if just the module is imported
    {
      provide: NotifierConfigToken,
      useFactory: notifierDefaultConfigFactory,
    },
  ],
})
export class NotifierModule {
  /**
   * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
   *
   * @param   [options={}] - Custom notifier options
   * @returns - Notifier module with custom providers
   */
  public static withConfig(options: NotifierOptions = {}): ModuleWithProviders<NotifierModule> {
    return {
      ngModule: NotifierModule,
      providers: [
        // Provide the options itself upfront (as we need to inject them as dependencies -- see below)
        {
          provide: NotifierOptionsToken,
          useValue: options,
        },

        // Provide a custom notifier configuration, based on the given notifier options
        {
          deps: [NotifierOptionsToken],
          provide: NotifierConfigToken,
          useFactory: notifierCustomConfigFactory,
        },
      ],
    };
  }
}