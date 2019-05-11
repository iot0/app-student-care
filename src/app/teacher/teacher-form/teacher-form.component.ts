import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, UserRole } from 'src/app/shared/models/user';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/shared/services/user.service';
import { generatePassword } from 'src/app/shared/helper';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss'],
})
export class TeacherFormComponent implements OnInit {

  createForm: FormGroup;

  @Output("success")
  onSuccess: EventEmitter<User> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    public modalController: ModalController,
    private userService: UserService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.createForm = this.fb.group({
      fullName: ["", Validators.required],
      dob: ["", Validators.required],
      emailId: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required]
    });
  }

  prepareSaveInfo(): User {
    let user =this.userService.currentUserObj();

    const formModel = this.createForm.value;
    let data: User = {
      FullName: formModel.fullName,
      DOB: formModel.dob,
      EmailId: formModel.emailId,
      PhoneNumber: formModel.phoneNumber,
      Address: formModel.address,
      Role: UserRole.Teacher,
      Password: generatePassword(formModel.dob, formModel.emailId),
      SchoolId:user.Uid
    };
    return data;
  }

  onSubmit() {
    console.log(this.createForm);
    if (this.createForm.valid) {
      this.themeService.progress(true);
      let data = this.prepareSaveInfo();

      this.userService
        .register(data)
        .then(res => {
          this.themeService.alert("Success", "Teacher registration successful");
          console.log(res);
          this.onSuccess.emit(res);
        })
        .catch(err => {
          if(err && err.message==="EMAIL_EXISTS"){
            this.themeService.alert("Invalid Email", "Mail already exists .");
          }
          else this.themeService.alert("Error", "Sorry something went wrong .");
        })
        .finally(() => {
          this.themeService.progress(false);
        });
    } else {
      this.themeService.alert("Fields Missing", "All Fields are necessary.");
    }
  }

}
