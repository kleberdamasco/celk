import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IState } from 'app/shared/model/federatedState.model';

@Component({
  selector: 'jhi-state-detail',
  templateUrl: './federated-state-detail.component.html'
})
export class FederatedStateDetailComponent implements OnInit {
  state: IState | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ state }) => (this.state = state));
  }

  previousState(): void {
    window.history.back();
  }
}
