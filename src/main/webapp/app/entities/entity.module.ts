import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'federated-state',
        loadChildren: () => import('./federated-state/federated-state.module').then(m => m.CelkStateModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CelkappEntityModule {}
