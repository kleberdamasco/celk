import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IState, FederatedState } from 'app/shared/model/federatedState.model';
import { FederatedStateService } from './federated-state.service';
import { FederatedStateComponent } from './federated-state.component';
import { FederatedStateDetailComponent } from './federated-state-detail.component';
import { FederatedStateUpdateComponent } from './federated-state-update.component';

@Injectable({ providedIn: 'root' })
export class StateResolve implements Resolve<IState> {
  constructor(private service: FederatedStateService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IState> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((state: HttpResponse<FederatedState>) => {
          if (state.body) {
            return of(state.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FederatedState());
  }
}

export const federatedStateRoute: Routes = [
  {
    path: '',
    component: FederatedStateComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'federated.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FederatedStateDetailComponent,
    resolve: {
      state: StateResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'federated.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FederatedStateUpdateComponent,
    resolve: {
      state: StateResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'federated.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FederatedStateUpdateComponent,
    resolve: {
      state: StateResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'federated.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
