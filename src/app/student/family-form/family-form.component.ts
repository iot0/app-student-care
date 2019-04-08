import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ThemeService } from "../../shared/services/theme.service";
import { ModalController } from "@ionic/angular";
import { UserService } from "../../shared/services/user.service";
import { User, UserRole } from "../../shared/models/user";
import { generatePassword } from "../../shared/helper";

@Component({
  selector: "app-family-form",
  templateUrl: "./family-form.component.html",
  styleUrls: ["./family-form.component.scss"]
})
export class FamilyFormComponent implements OnInit {
  createForm: FormGroup;
  todaysDate: string = new Date().toISOString();
  student: User;

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    public modalController: ModalController,
    private userService: UserService
  ) {
    this.initForm();
  }

  ngOnInit() {
    console.log(this.student);
  }

  initForm() {
    this.createForm = this.fb.group({
      fullName: ["", Validators.required],
      dob: ["", Validators.required],
      emailId: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }

  onClose() {
    this.modalController.dismiss();
  }

  prepareSaveInfo(): User {
    const formModel = this.createForm.value;
    let user: User = {
      FullName: formModel.fullName,
      Role: UserRole.Parent,
      EmailId: formModel.emailId,
      PhoneNumber: formModel.phoneNumber,
      Password: generatePassword(formModel.dob, formModel.emailId),
      DOB: formModel.dob,
      Student: {
        Uid: this.student.Uid,
        FullName: this.student.FullName
      }
    };
    return user;
  }

  async onSubmit() {
    console.log(this.createForm);
    if (!this.student || !this.student.Uid) {
      this.themeService.alert("Error", "Invalid Patient details ");
      return;
    }
    if (this.createForm.valid) {
      this.themeService.progress(true);
      let data = this.prepareSaveInfo();

      try {
        await this.userService.register(data);
        this.themeService.alert("Success", "Family added successfully");
        this.modalController.dismiss(true);
      } catch (err) {
        await this.themeService.progress(false);
        
        await this.themeService.alert("Error", "Sorry something went wrong .");
        console.log(err);
      } finally {
        await this.themeService.progress(false);
      }
    } else {
      this.themeService.alert("Fields Missing", "All Fields are necessary.");
    }
  }
}
