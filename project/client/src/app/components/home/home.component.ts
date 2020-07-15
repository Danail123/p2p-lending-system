import { UserDTO } from './../../features/users/models/user.dto';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private loggedInSubscription: Subscription;
  private userSubscription: Subscription;

  loggedIn: boolean;
  user: UserDTO;

  constructor(private readonly authService: AuthService) {}

  public ngOnInit() {
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(
      loggedIn => (this.loggedIn = loggedIn)
    );
    this.userSubscription = this.authService.loggedUser$.subscribe(user => {
      this.user = user;
    });
  }

  public ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
