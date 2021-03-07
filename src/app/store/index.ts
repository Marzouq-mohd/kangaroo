import { Subject } from 'rxjs';
import { ActionTypes } from './actions';
import { Test } from '../home/home.component';

interface InitialState {
  tests: Array<Object>;
}

let state: InitialState = {
  tests: [],
};

interface Event {
  type: String;
  payload?: Object;
}

export const store = new Subject<InitialState>();
export const eventDispatcher = new Subject<Event>();

eventDispatcher.subscribe((data: Event) => {
  switch (data.type) {
    case ActionTypes.GET_TESTS:
      store.next(state);
      break;

    case ActionTypes.CREATE_TEST:
      state = {
        tests: [...state.tests, data.payload!],
      };
      store.next(state);
      break;

    default:
      break;
  }
});
