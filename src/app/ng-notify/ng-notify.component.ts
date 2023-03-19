import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../notification/notifier.service';
@Component({
  selector: 'app-ng-notify',
  templateUrl: './ng-notify.component.html',
  styleUrls: ['./ng-notify.component.scss']
})
export class NgNotifyComponent implements OnInit {
 private readonly notifier: NotifierService
  constructor(notifierService: NotifierService) {
   this.notifier = notifierService;
   }

  ngOnInit(): void {
  this.notifier.show({
    type: 'success',
    message: 'You are awesome! I mean it!'
  });
  this.notifier.show({
      type: 'success',
      message: 'You are awesome! I mean it2!'
    });
  }

}
