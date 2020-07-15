import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../core/notifications.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 404) {
          this.router.navigate(['/not-found']);
          this.notificationService.error('Resource not found!');
        } else if (error.status >= 500) {
          this.router.navigate(['/server-error']);
          this.notificationService.error('Oops.. something went wrong.. :(');
        }

        return throwError(error);
      })
    );
  }
}
