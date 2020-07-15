import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificatorService } from '../services/notificator.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$
      .pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.notificator.error(`You must be logged in in order to see this page!`);
            this.router.navigate(['login']);
          }
        }),
      );
  }
}
