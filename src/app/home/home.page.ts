import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ThemeService } from '../shared/services/theme.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  drawerOptions: any;
  user:User;
  constructor(
    public userService: UserService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.drawerOptions = {
      handleHeight: 50,
      thresholdFromBottom: 200,
      thresholdFromTop: 200,
      bounceBack: true
    };

    this.user=this.userService.currentUserObj();
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {}

  async onLogOut() {
    await this.themeService.progress(true);
    try {
      await this.userService.logOut();
      this.router.navigate(["welcome"]);
    } catch (err) {
      console.dir(err);
      await this.themeService.toast(err.message);
    } finally {
      await this.themeService.progress(false);
    }
  }
}
