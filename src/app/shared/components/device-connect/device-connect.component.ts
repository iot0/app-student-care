import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { DrawerComponent } from "../drawer/drawer.component";
import { catchError, share, takeWhile, takeUntil, filter } from "rxjs/operators";
import { of, BehaviorSubject } from "rxjs";
import { DeviceService } from "../../services/device.service";
import { UserService } from "../../services/user.service";
import { ModalController } from "@ionic/angular";
import { BoundaryComponent } from "../boundary/boundary.component";
import { UserRole, User } from "../../models/user";
import { LocationService } from "../location/location.service";
import { ThemeService } from "../../services/theme.service";
import { DeviceAlertComponent } from "../device-alert/device-alert.component";

@Component({
  selector: "app-device-connect",
  templateUrl: "./device-connect.component.html",
  styleUrls: ["./device-connect.component.scss"]
})
export class DeviceConnectComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });

  @Input("drawer")
  drawer: DrawerComponent;
  isOpened: boolean;
  isAlive: boolean = true;
  boundaryCheck$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private deviceService: DeviceService,
    private mapService: LocationService,
    private themeService: ThemeService,
    private userService: UserService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.drawer) {
      this.drawer.onChange.subscribe(change => {
        this.onDrawerStateChange(change);
      });
    }
    let user = this.userService.currentUserObj();

    let service;
    if (user.Role === UserRole.Parent) {
      service = this.userService.getParentWatchingDevices(user.Student.Uid);
    } else if (user.Role === UserRole.Teacher) {
      service = this.userService.getTeacherWatchingDevices(user.Uid);
    }
    service
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        }),
        takeUntil(this.userService.isLoggedIn$.pipe(filter(x => !x))),
        takeWhile(() => this.isAlive)
      )
      .subscribe((res: any) => {
        if (res && res.length > 0) {
          this.data$.next({ data: res });
        } else this.data$.next({ empty: true });
      });

    // this.boundaryCheck$
  }

  //TODO: To show arrow accordingly for customer popup
  onDrawerStateChange(change) {
    switch (change) {
      case "opened":
        this.isOpened = true;
        break;
      case "closed":
        this.isOpened = false;
        break;
    }
  }
  async setBoundary(device) {
    let props = { ...device.Boundary };

    const modal = await this.modalCtrl.create({
      component: BoundaryComponent,
      componentProps: { data: props }
    });

    modal.onWillDismiss().then(res => {
      console.log(res);
      device.Boundary = res.data;
    });
    return await modal.present();
  }
  connect(device: any) {
    device.Status = "loading...";
    this.deviceService
      .sync(device.DeviceIp)
      .pipe(
        catchError(err => {
          device.Status = "error";
          return err;
        }),
        takeUntil(this.userService.isLoggedIn$.pipe(filter(x => !x))),
        takeWhile(() => this.isAlive)
      )
      .subscribe(res => {
        device.Status = "success";
        device.Result = res;
        console.log(res);
      });
  }
  async sendDeviceAlert(device: User) {
    const modal = await this.modalCtrl.create({
      component: DeviceAlertComponent,
      componentProps: { deviceIp: device.DeviceIp }
    });
    return await modal.present();
  }
}
