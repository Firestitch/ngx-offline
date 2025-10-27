import { Component, inject } from '@angular/core';

import { OfflineService } from 'playground/app/services';
import { OfflineComponent as OfflineComponent_1 } from '../../../../src/app/offline/components/offline/offline.component';


@Component({
    templateUrl: 'offline.component.html',
    standalone: true,
    imports: [OfflineComponent_1]
})
export class OfflineComponent {
  private _offliceService = inject(OfflineService);


  public constructor() {
    const _offliceService = this._offliceService;

    _offliceService.offline = { 
      enabled: true,
      content: '<h1>Offline</h1>',
    };
  }
}
