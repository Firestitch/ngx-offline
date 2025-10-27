import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Inject,
} from '@angular/core';

import { parse } from '@firestitch/date';

import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { isAfter, startOfMinute } from 'date-fns';

import { FsOfflineConfig, Offline } from '../../../interfaces';
import { FS_OFFLINE_CONFIG } from '../../../injectors';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FsHtmlRendererModule } from '@firestitch/html-editor';


@Component({
    selector: 'fs-offline',
    templateUrl: './offline.component.html',
    styleUrls: ['./offline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        FsHtmlRendererModule,
    ],
})
export class OfflineComponent implements OnInit {

  public offline;

  private _destroy$ = new Subject();

  constructor(
    @Inject(FS_OFFLINE_CONFIG) private _config: FsOfflineConfig,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    timer(0, this._config.statusFrequency * 1000)
      .pipe(
        switchMap(() => this._config.loadStatus()),
        takeUntil(this._destroy$),
      )
      .subscribe((offline: Offline) => {
        const enabled = offline?.enabled;
        const date = offline?.date;
        const redirect = offline?.redirect;
        const redirectDelay = offline?.redirectDelay;
        const redirectUrl = offline?.redirectUrl;

        if (!enabled || isAfter(parse(date), startOfMinute(new Date()))) {
          this.redirect('/');
        } else if (redirect) {
          if (redirectDelay) {
            setTimeout(() => {
              this.redirect(redirectUrl);
            }, redirectDelay * 1000);
          } else {
            this.redirect(redirectUrl);
          }
        }

        this.offline = offline;
        this._cdRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public redirect(url): void {
    (window as any).location = url;
  }

}
