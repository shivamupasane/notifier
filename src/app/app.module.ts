import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotifierModule } from 'angular-notifier';
import { NgNotifyComponent } from './ng-notify/ng-notify.component';
import { NotificationModule } from './notification/notification.module';
@NgModule({
  declarations: [
    AppComponent,
    NgNotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifierModule.withConfig({

  }),
  NotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
