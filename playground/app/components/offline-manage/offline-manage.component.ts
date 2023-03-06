import { Component } from '@angular/core';
import { OfflineService } from 'playground/app/services';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-offline-manage',
  templateUrl: './offline-manage.component.html',
  styleUrls: ['./offline-manage.component.scss']
})
export class OfflineManageComponent {

  public constructor(
    private _offlineSerice: OfflineService,
  ) {}


  public loadOffline = (): Observable<any> => {
    return of({
      enabled: false,
      content: '<h1>Offline</h1>',      
    });
  }

  public saveOffline = (offline) => {
    this._offlineSerice.offline = offline;
    return of(offline);
  }

}
