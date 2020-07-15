import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { LoanRequestService } from './loan-request.service';


@Injectable()
export class MyRequestsResolver implements Resolve<any> {
    constructor(
        private loanRequestService: LoanRequestService,
        private http: Http
    ) { }

    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.loanRequestService.getMyRequests()
    }
}
