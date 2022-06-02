import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsOfflineManageModule, FsOfflineModule } from '@firestitch/offline';
import { FsLabelModule } from '@firestitch/label';
import { FsStoreModule } from '@firestitch/store';
import { FsHtmlEditorModule } from '@firestitch/html-editor';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { OfflineManageComponent } from './components/offline-manage';
import { FS_OFFLINE_CONFIG } from 'src/app/injectors';
import { offlineConfig } from './helpers/offline-config';
import { OfflineComponent } from './components/offline';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { OfflineService } from './services';
import { FsOffline } from 'src/app/services';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { path: 'offline', component: OfflineComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
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
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: FS_OFFLINE_CONFIG, 
      useFactory: offlineConfig, 
      deps: [ OfflineService ] 
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
