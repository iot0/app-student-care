import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';
import { StudentCardComponent } from './student-card/student-card.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { SharedModule } from '../shared/shared.module';
import { FamilyCardComponent } from './family-card/family-card.component';
import { FamilyFormComponent } from './family-form/family-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [StudentPage,StudentCardComponent,StudentFormComponent,FamilyCardComponent,FamilyFormComponent],
  entryComponents:[FamilyFormComponent]
})
export class StudentPageModule {}
