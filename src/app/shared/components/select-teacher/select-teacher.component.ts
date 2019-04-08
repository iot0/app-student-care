import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { UserService } from "../../services/user.service";
import { catchError, takeWhile } from "rxjs/operators";
import { User } from "../../models/user";

@Component({
  selector: "app-select-teacher",
  templateUrl: "./select-teacher.component.html",
  styleUrls: ["./select-teacher.component.scss"]
})
export class SelectTeacherComponent {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;
  constructor(public modalController: ModalController, private userService: UserService) {
    let user = this.userService.currentUserObj();
    this.userService
      .getTeachers(user.Uid)
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
    this.modalController.dismiss();
  }
  onSelect(teacher: User) {
    this.modalController.dismiss(teacher);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
