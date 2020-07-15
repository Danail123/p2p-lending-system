import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  canActivate(): Observable<boolean> {

    return this.authService.isLoggedIn$
      .pipe(
        map(x => !x),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/']);
          }
        }),
      );
  }
}
