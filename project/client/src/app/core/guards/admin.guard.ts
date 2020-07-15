import { UserDTO } from './../../features/users/models/user.dto';
import { UserRole } from './../../common/enums/user-role.enum';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificatorService } from '../services/notificator.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly notificator: NotificatorService,
    ) { }

    canActivate(): Observable<boolean> {
        return this.authService.loggedUser$
            .pipe(
                map((user: UserDTO) => {
                    if (user.role !== UserRole.Admin) {
                        this.notificator.error(`You can't go on that page!`);
                        this.router.navigate(['/']);
                        return false;
                    } else {
                        return true;
                    }
                })
            );
    }
}
