import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ThemeService } from "src/app/shared/services/theme.service";
import { UserService } from "src/app/shared/services/user.service";
import { User, UserRole } from "src/app/shared/models/user";
import { ModalController } from "@ionic/angular";
import { SelectTeacherComponent } from "../../shared/components/select-teacher/select-teacher.component";
import { generatePassword } from "../../shared/helper";

@Component({
  selector: "app-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.scss"]
})
export class StudentFormComponent implements OnInit {
  createForm: FormGroup;
  @Output("success")
  onSuccess: EventEmitter<User> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private studentService: UserService,
    private modalController: ModalController
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.createForm = this.fb.group({
      name: ["", Validators.required],
      class: ["", Validators.required],
      address: ["", Validators.required],
      emailId: ["", Validators.required],
      dob: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      teacher: ["", Validators.required]
    });
  }

  prepareSaveInfo(): User {
    let user=this.studentService.currentUserObj();

    const formModel = this.createForm.value;
    let student: User = {
      FullName: formModel.name,
      Class: formModel.class,
      Address: formModel.address,
      Role: UserRole.Student,
      EmailId: formModel.emailId,
      PhoneNumber: formModel.phoneNumber,
      DOB: formModel.dob,
      Teacher: { Uid: formModel.teacher.Uid, FullName: formModel.teacher.FullName },
      SchoolId: user.Uid,
      Password: generatePassword(formModel.dob, formModel.emailId)
    };
    return student;
  }

  async openTeacherSelectModal() {
    const modal = await this.modalController.create({
      component: SelectTeacherComponent
    });
    modal.onWillDismiss().then(res => {
      if (res.data) {
        this.createForm.patchValue({
          teacher: { Uid: res.data.Uid, FullName: res.data.FullName }
        });
      }
    });
    return await modal.present();
  }

  async onSubmit() {
    console.log(this.createForm);
    if (this.createForm.valid) {
      this.themeService.progress(true);
      let data = this.prepareSaveInfo();

      try {
        let res = await this.studentService.register(data);
        this.onSuccess.emit(res);
        this.themeService.alert("Success", "Student added successfully");
      } catch (err) {
        await this.themeService.progress(false);
        console.log(err);
        await this.themeService.alert("Error", "Not able to add this Student .");
      } finally {
        await this.themeService.progress(false);
      }
    } else {
      this.themeService.alert("Fields Missing", "All Fields are necessary.");
    }
  }
}
