import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TeacherPage } from "./teacher.page";
import { TeacherFormComponent } from "./teacher-form/teacher-form.component";
import { TeacherCardComponent } from "./teacher-card/teacher-card.component";

const routes: Routes = [
  {
    path: "",
    component: TeacherPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [TeacherPage, TeacherFormComponent, TeacherCardComponent]
})
export class TeacherPageModule {}
