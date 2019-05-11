import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ThemeService } from "../../services/theme.service";
import { ModalController } from "@ionic/angular";
import { DeviceService } from "../../services/device.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-device-alert",
  templateUrl: "./device-alert.component.html",
  styleUrls: ["./device-alert.component.scss"]
})
export class DeviceAlertComponent implements OnInit {
  createForm: FormGroup;
  deviceIp: string;
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private deviceService: DeviceService,
    private themeService: ThemeService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createForm = this.fb.group({
      message: ["", Validators.required]
    });
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

  async onSubmit() {
    if (this.createForm.valid) {
      await this.themeService.progress(true);
      this.deviceService
        .send({ eventAlert: this.createForm.get("message").value }, this.deviceIp)
        .pipe(
          catchError(err => {
            this.themeService.progress(false);
            this.themeService.alert("Error", "Something went wrong :( ");
            this.modalCtrl.dismiss(false);
            return err;
          })
        )
        .subscribe(res => {
          this.themeService.progress(false);
          this.themeService.alert("Success", "Message sent successfully :) ");
          this.modalCtrl.dismiss(true);
        });
    } else {
      this.themeService.alert("Invalid", "Message cannot be empty !");
    }
  }
}
