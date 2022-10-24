import { Component } from '@angular/core';

import { OfflineService } from 'playground/app/services';


@Component({
  templateUrl: 'offline.component.html'
})
export class OfflineComponent {

  public constructor(
    private _offliceService: OfflineService,
  ) {
    _offliceService.offline = { 
      enabled: true,
      content: '<h1>Offline</h1>',
    };
  }
}
