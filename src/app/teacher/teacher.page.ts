import { Component, OnInit } from '@angular/core';
import { FormMode } from '../shared/models/form';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../shared/services/theme.service';
import { catchError, first, map } from 'rxjs/operators';
import { User } from '../shared/models/user';
import { SyncDeviceComponent } from '../shared/components/sync-device/sync-device.component';
import { UserService } from '../shared/services/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {

  mode: FormMode = "existing";
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  isAlive: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param);
      if (param.id && param.id != "undefined") {
        // loading patient details
        this.loadDetails(param.id);
      } else {
        this.mode = "new";
      }
    });
  }

  afterRegistration(data: User) {
    // this.router.navigate([`/teacher/${data.Uid}`]);
    this.router.navigate([`/teachers`]);
  }

  loadDetails(teacherId: string) {
    this.userService
      .getUserDetails(teacherId)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        console.log(res);
        if (res) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
      });
  }

}
