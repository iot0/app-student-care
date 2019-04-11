import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "../shared/services/user.service";
import { catchError, takeWhile, map, first } from "rxjs/operators";
import { User } from "../shared/models/user";
import { AttendanceService } from "../shared/services/attendance.service";
import { Attendance } from "../shared/models/attendance";
import { getDateString } from "../shared/helper";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ThemeService } from "../shared/services/theme.service";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.page.html",
  styleUrls: ["./attendance.page.scss"]
})
export class AttendancePage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;
  attendanceList: any;
  form: FormGroup;
  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    public attendanceService: AttendanceService,
    public themeService: ThemeService
  ) {
    this.initForm();
  }

  initForm() {
    let todaysDate = new Date();
    this.form = this.fb.group({
      date: [todaysDate.toDateString(), Validators.required]
    });
  }

  async ngOnInit() {
    await this.initDatas();
  }

  async initDatas(){
    let user = this.userService.currentUserObj();

    await this.loadDetails();
    let dateString = getDateString(new Date());
    this.attendanceList = await this.attendanceService.get(dateString, user.Uid);
    console.log(this.attendanceList);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
  checkAttendance(student: User) {}

  async markAttendance(student: User) {
    debugger;
    if (this.form.valid) {
      let user = this.userService.currentUserObj();
      //console.log(student);
      let attendance: Attendance = {
        Class: student.Class,
        Date: getDateString(this.form.get("date").value),
        Student: { Uid: student.Uid, FullName: student.FullName },
        Teacher: { Uid: user.Uid, FullName: user.FullName }
      };
      await this.attendanceService.markAttendance(attendance);
    } else {
      this.themeService.alert("Error", "Invalid date");
    }
  }

  async loadDetails() {
    let user = this.userService.currentUserObj();
    console.log(user);

    return await this.userService
      .getTeacherStudents(user.Uid)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        }),
        takeWhile(() => this.isAlive),
        map(res => {
          console.log(res);
          if (res && res.length > 0) {
            this.data$.next({ data: res });
          } else this.data$.next({ empty: true });
        }),
        first()
      )
      .toPromise();
  }
}
