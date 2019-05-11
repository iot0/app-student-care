import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { catchError, takeWhile } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ThemeService } from "../../services/theme.service";
import { UserService } from "../../services/user.service";
import { UserRole, User } from "../../models/user";

@Component({
  selector: "app-view-notification",
  templateUrl: "./view-notification.component.html",
  styleUrls: ["./view-notification.component.scss"]
})
export class ViewNotificationComponent implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;
  student: User;
  constructor(
    private notificationService: NotificationService,
    private modalCtrl: ModalController,
    public userService: UserService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    let user = this.userService.currentUserObj();

    if (!this.student) {
      this.data$.next({ error: true });
      this.themeService.alert("Error", "Invalid Parameters");
      return;
    }

    if (user.Role === UserRole.Teacher) {
      this.loadForTeacher(user.Uid, this.student.Uid);
    } else {
      this.loadForParent(this.student.Uid);
    }
  }

  loadForTeacher(teacherId: string, studentId: string) {
    this.notificationService
      .getTeacherStudentItems(teacherId, studentId)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        }),
        takeWhile(() => this.isAlive)
      )
      .subscribe((res: any) => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }

  loadForParent(studentId) {
    this.notificationService
      .getParentItems(studentId)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        }),
        takeWhile(() => this.isAlive)
      )
      .subscribe((res: any) => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }

  onClose() {
    this.modalCtrl.dismiss();
  }
}
