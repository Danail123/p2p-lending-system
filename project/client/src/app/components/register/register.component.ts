import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { UserDTO } from 'src/app/features/users/models/user.dto';
import { CreateUserDTO } from 'src/app/features/users/models/create-user.dto';
import { LoginUserDTO } from 'src/app/features/users/models/login-user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;

  constructor(
    private readonly usersService: UsersService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  public register(): void {
    const newUser: LoginUserDTO = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    };

    this.usersService.createUser(this.registerForm.value)
      .subscribe(
        () => {
          this.notificator.success(`Registration successful!`);
          this.authService.login(newUser).subscribe(() => {
            this.notificator.success(`Welcome ${newUser.username}!`);
            this.router.navigate(['/']);
          });
        },
        () => {
          this.notificator.error(`You can't use that username. Please enter other username!`);
        },
      );
  }

}
