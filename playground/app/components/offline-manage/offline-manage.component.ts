import { Component, inject } from '@angular/core';
import { OfflineService } from 'playground/app/services';
import { Observable, of } from 'rxjs';
import { OfflineManageComponent as OfflineManageComponent_1 } from '../../../../src/app/offline-manage/components/offline-manage/offline-manage.component';


@Component({
    selector: 'app-offline-manage',
    templateUrl: './offline-manage.component.html',
    styleUrls: ['./offline-manage.component.scss'],
    standalone: true,
    imports: [OfflineManageComponent_1]
})
export class OfflineManageComponent {
  private _offlineSerice = inject(OfflineService);



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
