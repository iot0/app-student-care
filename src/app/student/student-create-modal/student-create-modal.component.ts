import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { ModalController } from '@ionic/angular';
import { StudentService } from 'src/app/shared/services/student.service';
import { Student } from 'src/app/shared/models/student';

@Component({
  selector: 'app-student-create-modal',
  templateUrl: './student-create-modal.component.html',
  styleUrls: ['./student-create-modal.component.scss'],
})
export class StudentCreateModalComponent implements OnInit {

  createForm: FormGroup;

  constructor(private fb: FormBuilder,
     private themeService: ThemeService,
     public modalController: ModalController,
      private studentService: StudentService) {
    this.initForm();
  }

  ngOnInit() {

  }

  initForm() {
    this.createForm = this.fb.group({
      name: ["", Validators.required],
      class: ["", Validators.required],
      address: ["", Validators.required]
    });
  }

  onClose() {
    this.modalController.dismiss();
  }

  prepareSaveInfo(): Student {
    const formModel = this.createForm.value;
    let student: Student = {
      Name: formModel.name,
      Class: formModel.class,
      Address: formModel.address
    };
    return student;
  }

  onSubmit() {
    console.log(this.createForm);
    if (this.createForm.valid) {
      this.themeService.progress(true);
      let data = this.prepareSaveInfo();

      this.studentService.register(data)
        .then(res => {
          this.themeService.alert("Success", "Student added successfully");
        })
        .catch(err => {
          this.themeService.alert("Error", "Not able to add this Student .");
        })
        .finally(() => {
          this.themeService.progress(false);
          this.onClose();
        });
    } else {
      this.themeService.alert("Fields Missing", "All Fields are necessary.");
    }
  }

}
