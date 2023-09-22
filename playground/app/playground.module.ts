import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FsExampleModule } from '@firestitch/example';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsOfflineManageModule, FsOfflineModule } from '@firestitch/offline';
import { FsStoreModule } from '@firestitch/store';

import { FsDatePickerModule } from '@firestitch/datepicker';
import { FS_OFFLINE_CONFIG } from 'src/app/injectors';
import { FsOffline } from 'src/app/services';
import { AppComponent } from './app.component';
import {
  ExamplesComponent
} from './components';
import { OfflineComponent } from './components/offline';
import { OfflineManageComponent } from './components/offline-manage';
import { offlineConfig } from './helpers/offline-config';
import { AppMaterialModule } from './material.module';
import { OfflineService } from './services';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { path: 'offline', component: OfflineComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsOfflineManageModule,
    FsOfflineModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsDatePickerModule.forRoot(),
    FsStoreModule,
    FsExampleModule.forRoot(),
    FsHtmlEditorModule.forRoot(),
    FsMessageModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: FS_OFFLINE_CONFIG,
      useFactory: offlineConfig,
      deps: [OfflineService]
    },
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    OfflineManageComponent,
    OfflineComponent,
  ],
})
export class PlaygroundModule {

  public constructor(
    private _offline: FsOffline,
  ) {
    _offline.init();
  }
}
