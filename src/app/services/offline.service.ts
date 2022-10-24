import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { FsMessage } from '@firestitch/message';

import { merge, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { isAfter } from 'date-fns';
import { format } from 'date-fns/esm';

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
    private _router: Router,
  ) { }

  public init() {
    const statusFrequency = this.config.statusFrequency * 1000;

    merge(
      timer(statusFrequency, statusFrequency),
      this._router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
        ),
    )
      .pipe(
        filter(() => {
          return this._window.location.pathname.indexOf(this.config.offlineUrl) === -1;
        }),
        switchMap(() => this.config.loadStatus()),
        filter((offline) => offline?.enabled),
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
          this._message.hide();
          this._window.location.href = this.config.offlineUrl;
        }
      });
  }

}
