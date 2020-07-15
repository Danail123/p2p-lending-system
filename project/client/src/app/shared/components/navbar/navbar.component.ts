import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDTO } from 'src/app/features/users/models/user.dto';
import { AuthService } from '../../../../app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { NotificationService } from 'src/app/core/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private loggedInSubscription: Subscription;
  private userSubscription: Subscription;

  loggedIn: boolean;
  loggedUsserInfo: UserDTO;
  loggedUserId: string;

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly notification: NotificationService,
    private readonly router: Router,
  ) {

  }

  public ngOnInit() {

    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(
      loggedIn => this.loggedIn = loggedIn,
    );

    // this.authService.loggedUser$.subscribe(
    //   (user) => { this.loggedUserId = user.id} 
    // );

    // this.usersService.getUserById(this.loggedUserId).subscribe(
    //   (user: UserDTO) => { this.loggedUsserInfo = user;
    //   }
    // )
  }

  public ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      this.notification.success('Logged out successfully');
      this.router.navigate(['']);
    });
  }

}
