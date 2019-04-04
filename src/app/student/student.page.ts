import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { StudentService } from '../shared/services/student.service';
import { catchError, takeWhile } from 'rxjs/operators';
import { StudentCreateModalComponent } from './student-create-modal/student-create-modal.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;
  constructor(public modalController: ModalController, private studentService: StudentService) {}

  ngOnInit() {
    this.studentService
      .get()
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        }),
        takeWhile(() => this.isAlive)
      )
      .subscribe(res => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }

  async onStudentCreate() {
    const modal = await this.modalController.create({
      component: StudentCreateModalComponent
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
