import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DrawerComponent } from './components/drawer/drawer.component';
import { DeviceConnectComponent } from './components/device-connect/device-connect.component';
import { LocationModule } from './components/location/location.module';
import { RibbonDirective } from './directives/ribbon.directive';
import { SyncDeviceComponent } from './components/sync-device/sync-device.component';
import { SelectTeacherComponent } from './components/select-teacher/select-teacher.component';
import { RouterModule } from '@angular/router';
import { BoundaryComponent } from './components/boundary/boundary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationModalComponent } from './components/location/location-modal.component';

@NgModule({
  declarations:[DrawerComponent,DeviceConnectComponent, RibbonDirective,SyncDeviceComponent,SelectTeacherComponent,BoundaryComponent],
  imports: [
    CommonModule,
    IonicModule,
    LocationModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[DrawerComponent,DeviceConnectComponent,LocationModule,RibbonDirective,SyncDeviceComponent,SelectTeacherComponent,BoundaryComponent,ReactiveFormsModule],
  entryComponents:[SelectTeacherComponent,SyncDeviceComponent,BoundaryComponent,LocationModalComponent]
})
export class SharedModule { }
