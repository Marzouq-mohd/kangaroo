import { Component, OnInit } from '@angular/core';
import { eventDispatcher, store } from '../store';
import { ActionTypes } from '../store/actions';
import { Test } from '../home/home.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor() {
    store.subscribe((state: any) => {
      const { tests } = state;
      this.tests = tests;
      console.log(this.tests);
    });
  }

  tests: Array<Test> = [];

  ngOnInit(): void {
    eventDispatcher.next({ type: ActionTypes.GET_TESTS });
  }
}
