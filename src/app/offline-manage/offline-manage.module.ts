import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsFormModule } from '@firestitch/form';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { FsLabelModule } from '@firestitch/label';
import { FsSkeletonModule } from '@firestitch/skeleton';

import { OfflineManageComponent } from './components';


@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,

    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,

    FsFormModule,
    FsSkeletonModule,
    FsDatePickerModule,
    FsLabelModule,
    FsHtmlEditorModule,
  ],
  declarations: [
    OfflineManageComponent,
  ],
  exports: [
    OfflineManageComponent,
  ],
})
export class FsOfflineManageModule { }
