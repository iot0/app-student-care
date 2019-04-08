import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-teacher-card",
  templateUrl: "./teacher-card.component.html",
  styleUrls: ["./teacher-card.component.scss"]
})
export class TeacherCardComponent implements OnInit {
  @Input() data;

  constructor() {}

  ngOnInit() {}

  
  calculateAge(date) {
    let yearDiff = new Date().getFullYear() - new Date(date).getFullYear();
    return yearDiff;
  }
}
