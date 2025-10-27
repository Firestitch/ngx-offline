import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { OfflineManageComponent } from '../offline-manage/offline-manage.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, OfflineManageComponent]
})
export class ExamplesComponent {
  public config = environment;
}
