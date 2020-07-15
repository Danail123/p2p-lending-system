import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(
        private readonly storageService: StorageService,
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ) {
        const token = this.storageService.read('token') || '';
        const updatedRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
        });

        return next.handle(updatedRequest);
    }
}
