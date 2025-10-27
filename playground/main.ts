import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { PlaygroundModule } from './app/playground.module';
import { environment } from './environments/environment';
import { FS_OFFLINE_CONFIG } from 'src/app/injectors';
import { offlineConfig } from './app/helpers/offline-config';
import { OfflineService } from './app/services';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsLabelModule } from '@firestitch/label';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsStoreModule } from '@firestitch/store';
import { FsExampleModule } from '@firestitch/example';
import { FsHtmlEditorModule } from '@firestitch/html-editor';
import { FsMessageModule } from '@firestitch/message';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { OfflineComponent } from './app/components/offline';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { path: 'offline', component: OfflineComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsLabelModule, FsDatePickerModule.forRoot(), FsStoreModule, FsExampleModule.forRoot(), FsHtmlEditorModule.forRoot(), FsMessageModule.forRoot()),
        {
            provide: FS_OFFLINE_CONFIG,
            useFactory: offlineConfig,
            deps: [OfflineService]
        },
        provideAnimations(),
        provideRouter(routes),
    ]
})
  .catch(err => console.error(err));

