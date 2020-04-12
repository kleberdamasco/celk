import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IState, FederatedState } from 'app/shared/model/federatedState.model';
import { FederatedStateService } from './federated-state.service';

@Component({
  selector: 'jhi-state-update',
  templateUrl: './federated-state-update.component.html'
})
export class FederatedStateUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    initials: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    createdDate: [null, [Validators.required]]
  });

  constructor(protected stateService: FederatedStateService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ state }) => {
      if (!state.id) {
        const today = moment();
        state.createdDate = today;
      }
      this.updateForm(state);
    });
  }

  updateForm(state: IState): void {
    this.editForm.patchValue({
      id: state.id,
      initials: state.initials,
      name: state.name,
      createdDate: state.createdDate ? state.createdDate.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const state = this.createFromForm();
    if (state.id !== undefined) {
      this.subscribeToSaveResponse(this.stateService.update(state));
    } else {
      this.subscribeToSaveResponse(this.stateService.create(state));
    }
  }

  private createFromForm(): IState {
    return {
      ...new FederatedState(),
      id: this.editForm.get(['id'])!.value,
      initials: this.editForm.get(['initials'])!.value,
      name: this.editForm.get(['name'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value
        ? moment(this.editForm.get(['createdDate'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IState>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
