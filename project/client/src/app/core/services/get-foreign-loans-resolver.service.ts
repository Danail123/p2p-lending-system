import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { LoanRequestService } from './loan-request.service';
import { BorrowerRoutingModule } from 'src/app/features/borrower-screen/borrower-routing.module';
import { BorrowerModule } from 'src/app/features/borrower-screen/borrower.module';
import { CreateLoanRequestDTO } from 'src/app/features/borrower-screen/models/create-loan-request.dto';
import { stringify } from 'querystring';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/app/features/users/models/user.dto';

@Injectable()
export class ForeignRequestsResolver implements Resolve<any> {
    constructor(
        private loanRequestService: LoanRequestService,
        private http: Http,
        private readonly authService: AuthService,
    ) { }
        
    loggedUser: UserDTO;

    ngOnInit () {
        this.authService.loggedUser$.subscribe(
            (user) => { this.loggedUser = user}
          )

    }

    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any[]> {
        return this.loanRequestService.getForeignRequests()
    }
}
