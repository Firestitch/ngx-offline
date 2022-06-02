import { of } from 'rxjs';
import { FsOfflineConfig } from '@firestitch/offline';
import { OfflineService } from '../services';


export function offlineConfig(
  officeService: OfflineService,
): FsOfflineConfig {

  return {
    loadStatus: () => {
      return of(officeService.offline);
    },
    statusFrequency: 10,
    offlineUrl: '/offline',
    onlineUrl: '/',
  };
}
