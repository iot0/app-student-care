import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { User } from "../../models/user";

@Component({
  selector: "app-boundary",
  templateUrl: "./boundary.component.html",
  styleUrls: ["./boundary.component.scss"]
})
export class BoundaryComponent implements OnInit {
  createForm: FormGroup;
  @Input() data;
  constructor(private fb: FormBuilder, public modalController: ModalController) {
    this.initForm();
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data && this.data.radius && this.data.latLng) {
      this.patchForm(this.data);
    }
  }

  initForm() {
    this.createForm = this.fb.group({
      radius: ["", Validators.required],
      latLng: ["", Validators.required]
    });
  }

  patchForm(data) {
    this.createForm.patchValue({
      radius: data.radius,
      latLng: data.latLng
    });
  }

  onLocationSelect(location) {
    if (location) {
      this.createForm.get("latLng").setValue(JSON.stringify(location));
    }
  }

  onClose() {
    this.modalController.dismiss();
  }

  prepareSaveInfo(): User {
    const formModel = this.createForm.value;
    return formModel;
  }

  onSubmit() {
    console.log(this.createForm);
    if (this.createForm.valid) {
      let data = this.prepareSaveInfo();
      this.modalController.dismiss(data);
    }
  }
}
