// tslint:disable:next-line: variable-name
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/core/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  public login(): void {
    this.authService.login(this.loginForm.value)
      .subscribe(
        () => {
          this.notificator.success(`Welcome back ${this.loginForm.value.username}!`);
          this.router.navigate(['/']);
        },
        (e) => {
          if (e.error.error.includes('BANNED')) {
            this.notificator.error(`Sorry, you are BANNED! Contact us for more information!`);
            this.router.navigate(['/']);
          } else {
            this.notificator.error(`${e.error.error} `);
          }
        },
      );
  }

}
