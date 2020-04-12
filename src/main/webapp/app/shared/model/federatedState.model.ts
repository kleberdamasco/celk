import { Moment } from 'moment';

export interface IState {
  id?: number;
  initials?: string;
  name?: string;
  createdDate?: Moment;
}

export class FederatedState implements IState {
  constructor(public id?: number, public initials?: string, public name?: string, public createdDate?: Moment) {}
}
