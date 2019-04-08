import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { DeviceService } from '../../services/device.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sync-device',
  templateUrl: './sync-device.component.html',
  styleUrls: ['./sync-device.component.scss'],
})
export class SyncDeviceComponent implements OnInit {

  student: User;
  constructor( private modalCtrl: ModalController) {}

  ngOnInit() {}

  onClose() {
    this.modalCtrl.dismiss();
  }

  onSync(ip: string) {
    this.modalCtrl.dismiss(ip);
  }

}
