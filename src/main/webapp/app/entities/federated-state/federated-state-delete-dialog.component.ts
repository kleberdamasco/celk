import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IState } from 'app/shared/model/federatedState.model';
import { FederatedStateService } from './federated-state.service';

@Component({
  templateUrl: './federated-state-delete-dialog.component.html'
})
export class FederatedStateDeleteDialogComponent {
  state?: IState;

  constructor(protected stateService: FederatedStateService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stateService.delete(id).subscribe(() => {
      this.eventManager.broadcast('stateListModification');
      this.activeModal.close();
    });
  }
}
