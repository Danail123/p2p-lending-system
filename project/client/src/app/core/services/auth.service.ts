
import { UserDTO } from './../../features/users/models/user.dto';
import { LoginUserDTO } from './../../features/users/models/login-user.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CONFIG } from 'src/app/config/config';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  private readonly loggedUserSubject$ = new BehaviorSubject<UserDTO>(this.loggedUser());

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly jwtService: JwtHelperService,
  ) { }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  get loggedUser$(): Observable<UserDTO> {
    return this.loggedUserSubject$.asObservable();
  }

  login(user: LoginUserDTO): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${CONFIG.MAIN_URL}/session`, user)
      .pipe(
        tap(({ token }) => {
          try {
            const loggedUser: UserDTO = this.jwtService.decodeToken(token);
            this.storage.save('token', token);

            this.isLoggedInSubject$.next(true);
            this.loggedUserSubject$.next(loggedUser);
          } catch (error) {
            // error handling on the consumer side
          }
        }),
      );
  }

  logout(): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${CONFIG.MAIN_URL}/session`)
      .pipe(
        tap(() => {
          try {
            this.storage.save('token', '');

            this.isLoggedInSubject$.next(false);
            this.loggedUserSubject$.next(null);
          } catch (error) {
            // error handling on the consumer side
          }
        }),
      );
  }

  private isUserLoggedIn(): boolean {
    return !!this.storage.read('token');
  }

  private loggedUser(): UserDTO {
    try {
      return this.jwtService.decodeToken(this.storage.read('token'));
    } catch (error) {
      // in case of storage tampering
      this.isLoggedInSubject$.next(false);

      return null;
    }
  }
}
