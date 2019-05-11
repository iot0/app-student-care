import { Component, OnInit, Input } from "@angular/core";
import { CreateNotificationComponent } from "src/app/shared/components/create-notification/create-notification.component";
import { ModalController } from "@ionic/angular";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-student-card",
  templateUrl: "./student-card.component.html",
  styleUrls: ["./student-card.component.scss"]
})
export class StudentCardComponent implements OnInit {
  @Input() data;
  constructor(private modalController: ModalController, public userService: UserService) {}

  ngOnInit() {}

  calculateAge(date) {
    let yearDiff = new Date().getFullYear() - new Date(date).getFullYear();
    return yearDiff;
  }

  async onCreateMessage() {
    let user = this.userService.currentUserObj();
    const modal = await this.modalController.create({
      component: CreateNotificationComponent,
      componentProps: {
        student: { Uid: this.data.Uid, FullName: this.data.FullName },
        teacher: { Uid: user.Uid, FullName: user.FullName }
      }
    });
    return await modal.present();
  }
}
