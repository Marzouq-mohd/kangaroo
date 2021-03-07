import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { eventDispatcher } from '../store';
import { ActionTypes } from '../store/actions';

export interface Test {
  id?: string;
  date?: Date;
  fields?: Array<number>;
  result?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  kangarooCheck: FormGroup;
  sameLocation?: String;
  test: Test = {
    id: '',
    date: new Date(),
    fields: [],
    result: '',
  };
  constructor(public formBuilder: FormBuilder) {
    this.kangarooCheck = this.formBuilder.group({
      v1: new FormControl('', Validators.required),
      v2: new FormControl('', Validators.required),
      x1: new FormControl('', Validators.required),
      x2: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  generateUID(): string {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  resetState() {
    this.test = {
      id: '',
      date: new Date(),
      fields: [],
      result: '',
    };
  }

  kangaroo(x1: number, v1: number, x2: number, v2: number) {
    this.test.fields = [x1, v1, x2, v2];
    let n = 0;
    while (n < 10000) {
      if (x1 + n * v1 === x2 + n * v2) {
        const Test: Test = {
          ...this.test,
          id: this.generateUID(),
          result: 'YES',
        };
        console.log(Test);
        console.log('YES');
        eventDispatcher.next({
          type: ActionTypes.CREATE_TEST,
          payload: Test,
        });
        return (this.sameLocation = 'YES');
      }
      n++;
    }
    const Test: Test = {
      ...this.test,
      id: this.generateUID(),
      result: 'NO',
    };
    console.log(Test);
    console.log('NO');
    eventDispatcher.next({
      type: ActionTypes.CREATE_TEST,
      payload: Test,
    });
    return (this.sameLocation = 'NO');
  }
}
