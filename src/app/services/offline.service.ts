import { Inject, Injectable } from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { filter, switchMap } from 'rxjs/operators';

import { format, isAfter } from 'date-fns';

import { timer } from 'rxjs';
import { FS_OFFLINE_CONFIG } from '../injectors';
import { FsOfflineConfig, Offline } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class FsOffline {

  private _goingOfflineMessage;
  private _window: any = window;

  constructor(
    @Inject(FS_OFFLINE_CONFIG) private config: FsOfflineConfig,
    private _message: FsMessage,
  ) { }

  public init() {
    const statusFrequency = this.config.statusFrequency * 1000;

    timer(0, statusFrequency)
      .pipe(
        switchMap(() => {
          return this.config.loadStatus();
        }),
        filter((offline: any) => offline?.enabled),
      )
      .subscribe((offline: Offline) => {
        if (isAfter(offline.date, new Date())) {
          let message = offline.goingOfflineMessage;
          if (message) {
            const time = format(offline.date, 'MMM d p');
            message = message.replace('{$offlineTime}', time);

            if (this._goingOfflineMessage !== message) {
              this._message.hide();
              this._goingOfflineMessage = message;
            }

            this._message.info(message, { timeout: 60 * 60 * 365 });
          }
        } else {
          if (this._window.location.href.indexOf(this.config.offlineUrl) === -1) {
            this._message.hide();
            this._window.location.href = this.config.offlineUrl;
          }
        }
      });
  }

}
