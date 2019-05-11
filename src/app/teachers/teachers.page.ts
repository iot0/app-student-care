import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { catchError, takeWhile } from "rxjs/operators";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.page.html",
  styleUrls: ["./teachers.page.scss"]
})
export class TeachersPage implements OnInit, OnDestroy {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;
  constructor(public userService: UserService) {}

  ngOnInit() {
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
      .subscribe(res => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
