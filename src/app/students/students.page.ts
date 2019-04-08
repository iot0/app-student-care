import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "../shared/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { ThemeService } from "../shared/services/theme.service";
import { StudentService } from "../shared/services/student.service";
import { catchError, takeWhile } from "rxjs/operators";
import { UserRole } from "../shared/models/user";

@Component({
  selector: "app-students",
  templateUrl: "./students.page.html",
  styleUrls: ["./students.page.scss"]
})
export class StudentsPage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;
  constructor(public userService: UserService, private route: ActivatedRoute, private themeService: ThemeService) {
    this.route.params.subscribe(param => {
      console.log(param);
      // loading  details
      this.loadDetails();
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  loadDetails() {
    let user = this.userService.currentUserObj();
    console.log(user);
    let service;
    if (user.Role === UserRole.School) {
      service = this.userService.getStudents(user.Uid);
    } else {
      service = this.userService.getTeacherStudents(user.Uid);
    }
    service
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        }),
        takeWhile(() => this.isAlive)
      )
      .subscribe(res => {
        console.log(res);
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
      });
  }
}
