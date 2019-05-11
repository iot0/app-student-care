import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { DeviceConnectComponent } from "./components/device-connect/device-connect.component";
import { LocationModule } from "./components/location/location.module";
import { RibbonDirective } from "./directives/ribbon.directive";
import { SyncDeviceComponent } from "./components/sync-device/sync-device.component";
import { SelectTeacherComponent } from "./components/select-teacher/select-teacher.component";
import { RouterModule } from "@angular/router";
import { BoundaryComponent } from "./components/boundary/boundary.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LocationModalComponent } from "./components/location/location-modal.component";
import { ViewNotificationComponent } from "./components/view-notification/view-notification.component";
import { CreateNotificationComponent } from "./components/create-notification/create-notification.component";
import { DeviceAlertComponent } from './components/device-alert/device-alert.component';
import { DeviceNotificationComponent } from './components/device-notification/device-notification.component';

@NgModule({
  declarations: [
    DrawerComponent,
    DeviceConnectComponent,
    RibbonDirective,
    SyncDeviceComponent,
    SelectTeacherComponent,
    BoundaryComponent,
    ViewNotificationComponent,
    CreateNotificationComponent,
    DeviceAlertComponent,
    DeviceNotificationComponent
  ],
  imports: [CommonModule, IonicModule, LocationModule, RouterModule, ReactiveFormsModule],
  exports: [
    DrawerComponent,
    DeviceConnectComponent,
    LocationModule,
    RibbonDirective,
    SyncDeviceComponent,
    SelectTeacherComponent,
    BoundaryComponent,
    ReactiveFormsModule,
    ViewNotificationComponent,
    CreateNotificationComponent,
    DeviceAlertComponent
  ],
  entryComponents: [
    SelectTeacherComponent,
    SyncDeviceComponent,
    BoundaryComponent,
    LocationModalComponent,
    ViewNotificationComponent,
    CreateNotificationComponent,
    DeviceAlertComponent
  ]
})
export class SharedModule {}
