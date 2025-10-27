import { Component } from '@angular/core';

import { OfflineService } from 'playground/app/services';
import { OfflineComponent as OfflineComponent_1 } from '../../../../src/app/offline/components/offline/offline.component';


@Component({
    templateUrl: 'offline.component.html',
    standalone: true,
    imports: [OfflineComponent_1]
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
