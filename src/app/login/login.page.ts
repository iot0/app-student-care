import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from '../shared/services/theme.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  async onLogin() {
    // 1. Check form validity
    if (this.loginForm.valid) {
      // 2. show progress indicator
      await this.themeService.progress(true);

      try {
        // 3. get the values to variable from the form variable
        const { email, password } = this.loginForm.value;
        let user: User = { EmailId: email, Password: password };
        // 4. finally call firebase login
        const res = await this.userService.login(user);
        if (res) {
          this.router.navigate(["home"]);
        }else{
          await this.themeService.toast("Invalid User");  
        }
      } catch (err) {
        // 5. handle error , showing error message
        console.dir(err);
        await this.themeService.toast(err.message);
      } finally {
        // 6. finally hide the progress indicator .
        await this.themeService.progress(false);
      }
    }
  }

}
