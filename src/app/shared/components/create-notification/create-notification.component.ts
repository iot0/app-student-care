import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { NotificationService } from "../../services/notification.service";
import { ThemeService } from "../../services/theme.service";
import { catchError, takeWhile } from "rxjs/operators";
import { AppNotification, NotificationType } from "../../models/notification";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-create-notification",
  templateUrl: "./create-notification.component.html",
  styleUrls: ["./create-notification.component.scss"]
})
export class CreateNotificationComponent implements OnInit {
  createForm: FormGroup;
  isAlive: boolean = true;
  student: User;
  teacher: User;
  constructor(
    private notificationService: NotificationService,
    private themeService: ThemeService,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createForm = this.fb.group({
      message: ["", Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  prepareSaveInfo(): AppNotification {
    const formModel = this.createForm.value;
    console.log(formModel);
    let data: AppNotification = {
      Message: formModel.message,
      Student: this.student,
      Teacher: this.teacher
    };
    return data;
  }

  onClose() {
    this.modalCtrl.dismiss();
  }
  async onSubmit() {
    console.log(this.createForm);
    if (this.createForm.valid) {
      this.themeService.progress(true);
      let data = this.prepareSaveInfo();
      console.log(data);
      try {
        let res = await this.notificationService.createNotification(data);
        await this.themeService.alert("Success", "Notification created successfully .");
        this.modalCtrl.dismiss(true);
      } catch (err) {
        console.log(err);
        await this.themeService.progress(false);
        await this.themeService.alert("Error", "Sorry something went wrong .");
      } finally {
        await this.themeService.progress(false);
      }
    } else {
      this.themeService.alert("Fields Missing", "All Fields are necessary.");
    }
  }
}
