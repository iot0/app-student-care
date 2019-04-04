import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentPage } from './student.page';
import { StudentCreateModalComponent } from './student-create-modal/student-create-modal.component';

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
    ReactiveFormsModule
  ],
  declarations: [StudentPage,StudentCreateModalComponent],
  entryComponents:[StudentCreateModalComponent]
})
export class StudentPageModule {}
