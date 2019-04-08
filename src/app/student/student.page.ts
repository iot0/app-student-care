import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { StudentService } from "../shared/services/student.service";
import { catchError, takeWhile, first, map } from "rxjs/operators";
import { User, UserRole } from "../shared/models/user";
import { FormMode } from "../shared/models/form";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../shared/services/user.service";
import { FamilyFormComponent } from "./family-form/family-form.component";
import { SyncDeviceComponent } from "../shared/components/sync-device/sync-device.component";
import { ThemeService } from "../shared/services/theme.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.page.html",
  styleUrls: ["./student.page.scss"]
})
export class StudentPage implements OnInit {
  mode: FormMode = "existing";
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  family$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;
  user: User;
  isTrackingOn: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public modalController: ModalController,
    public themeService: ThemeService
  ) {}

  async ngOnInit() {
    this.user = this.userService.currentUserObj();

    this.route.params.subscribe(param => {
      console.log(param);
      if (param.id && param.id != "undefined") {
        // loading patient details
        this.loadDetails(param.id);
        //loading family details
        this.loadFamilies(param.id);
      } else {
        this.mode = "new";
      }
    });
  }

  afterRegistration(data: User) {
    this.router.navigate([`/student/${data.Uid}`]);
  }

  async addFamily() {
    let student: User = await this.data$
      .pipe(
        first(),
        map(x => x.data)
      )
      .toPromise();
    const modal = await this.modalController.create({
      component: FamilyFormComponent,
      componentProps: { student: student }
    });
    modal.onWillDismiss().then(res => {
      if (res && res.data) {
        this.loadFamilies(student.Uid);
      }
    });
    return await modal.present();
  }
  loadFamilies(studentId: string) {
    this.userService
      .getFamilies(studentId)
      .pipe(
        catchError(err => {
          this.family$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        console.log(res);
        if (res && res.length > 0) this.family$.next({ data: res });
        else this.family$.next({ empty: true });
      });
  }
  loadDetails(studentId: string) {
    this.userService
      .getUserDetails(studentId)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.data$.next({ data: res });
          this.isBeingTracked();
        } else this.data$.next({ empty: true });
      });
  }

  async addToWatch() {
    let student: User = await this.data$
      .pipe(
        first(),
        map(x => x.data)
      )
      .toPromise();

    if (student && student.Uid) {
      const modal = await this.modalController.create({
        component: SyncDeviceComponent,
        componentProps: { student: student }
      });
      modal.onWillDismiss().then(res => {
        if (res && res.data) {
          if (this.user.Role == UserRole.Teacher) {
            this.userService.watchStudentByTeacher(student.Uid, res.data);
          } else {
            this.userService.watchStudentByParent(student.Uid, res.data);
          }
        }
      });
      await modal.present();
    } else {
      await this.themeService.alert("Error", "Invalid patient details :( ");
    }
  }

  async removeFromWatch() {
    let patient: User = await this.data$
      .pipe(
        first(),
        map(x => x.data)
      )
      .toPromise();

    if (patient && patient.Uid) {
      if (this.user.Role == UserRole.Teacher) {
        await this.userService.unWatchStudentTeacher(patient.Uid);
      } else {
        await this.userService.unWatchStudentParent(patient.Uid);
      }
    } else {
      this.themeService.alert("Error", "Invalid patient details :( ");
    }
  }
  async isBeingTracked() {
    this.isTrackingOn = false;
    let student: User = await this.data$
      .pipe(
        first(),
        map(x => x.data)
      )
      .toPromise();
    if (student) {
      if (this.user.Role == UserRole.Teacher) {
        this.isTrackingOn = student.IsTeacherWatching;
      } else if (this.user.Role == UserRole.Parent) {
        this.isTrackingOn = student.IsParentWatching;
      }
    }
    return this.isTrackingOn;
  }
}
