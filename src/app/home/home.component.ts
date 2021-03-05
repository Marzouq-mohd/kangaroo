import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  kangarooCheck: FormGroup;
  sameLocation?: String;
  constructor(public formBuilder: FormBuilder) {
    this.kangarooCheck = this.formBuilder.group({
      v1: new FormControl('', Validators.required),
      v2: new FormControl('', Validators.required),
      x1: new FormControl('', Validators.required),
      x2: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  kangaroo(x1: number, v1: number, x2: number, v2: number) {
    console.log(this.kangarooCheck);
    let n = 0;
    while (n < 10000) {
      if (x1 + n * v1 === x2 + n * v2) {
        console.log('YES');
        return (this.sameLocation = 'YES');
      }
      n++;
    }
    console.log('NO');
    return (this.sameLocation = 'NO');
  }
}
