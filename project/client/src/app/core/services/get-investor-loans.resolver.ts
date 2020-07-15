import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { LoanRequestService } from './loan-request.service';
import { BorrowerRoutingModule } from 'src/app/features/borrower-screen/borrower-routing.module';
import { BorrowerModule } from 'src/app/features/borrower-screen/borrower.module';
import { CreateLoanRequestDTO } from 'src/app/features/borrower-screen/models/create-loan-request.dto';
import { ActiveLoanService } from './active-loan.service';

@Injectable()
export class GetInvestorLoansResolver implements Resolve<any> {
    constructor(
        private readonly activeLoanService: ActiveLoanService,
        private http: Http
    ) { }

    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.activeLoanService.getInvestorLoans()
    }
}
