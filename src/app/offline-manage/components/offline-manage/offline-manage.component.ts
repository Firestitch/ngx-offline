import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Input,
} from '@angular/core';

import { FsMessage } from '@firestitch/message';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Offline } from '../../../interfaces';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatSuffix, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'fs-offline-manage',
    templateUrl: './offline-manage.component.html',
    styleUrls: ['./offline-manage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsSkeletonModule,
        FormsModule,
        FsFormModule,
        FsLabelModule,
        MatCheckbox,
        MatFormField,
        MatInput,
        MatSuffix,
        FsDatePickerModule,
        MatHint,
        FsHtmlEditorModule,
        MatButton,
    ],
})
export class OfflineManageComponent implements OnInit, OnDestroy {

  @Input() saveOffline: (offline: Offline) => Observable<Offline>;
  @Input() loadOffline: () => Observable<Offline>;

  public offline: any = null;

  private _destroy$ = new Subject();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _message: FsMessage,
  ) {}

  public ngOnInit(): void {
    this.loadOffline()
      .subscribe((offline) => {
        this.offline = {
          content: this.defaultContent,
          goingOfflineMessage: 'The app will be going offline on {$offlineTime}',
          ...offline,
        };

        this._cdRef.markForCheck();
      });
  }

  public save = () => {
    return this.saveOffline(this.offline)
      .pipe(
        tap((offline) => {
          this._message.success('Saved Changes');
          this.offline = offline;
        }),
      );
  };

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public get defaultContent() {
    return `
    <p style="text-align: center;">
      <span style="font-size: 24px;">
        <strong>App Offline</strong>
      </span>
    </p>
    <p style="text-align: center;">The app is currently offline due to maintenance</p>`;
  }

}
