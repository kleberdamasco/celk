import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CelkappSharedModule } from 'app/shared/shared.module';
import { FederatedStateComponent } from './federated-state.component';
import { FederatedStateDetailComponent } from './federated-state-detail.component';
import { FederatedStateUpdateComponent } from './federated-state-update.component';
import { FederatedStateDeleteDialogComponent } from './federated-state-delete-dialog.component';
import { federatedStateRoute } from './federated-state.route';

@NgModule({
  imports: [CelkappSharedModule, RouterModule.forChild(federatedStateRoute)],
  declarations: [
    FederatedStateComponent,
    FederatedStateDetailComponent,
    FederatedStateUpdateComponent,
    FederatedStateDeleteDialogComponent
  ],
  entryComponents: [FederatedStateDeleteDialogComponent]
})
export class CelkStateModule {}
