import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit() {}

  calculateAge(date) {
    let yearDiff = new Date().getFullYear() - new Date(date).getFullYear();
    return yearDiff;
  }
}
