import { LoanPerUserDTO } from '../../features/borrower-screen/models/loans-per-user.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config/config';
import { ActiveLoanDTO } from 'src/app/features/borrower-screen/models/active-loan.dto';
import { CreateActiveLoanDTO } from 'src/app/features/borrower-screen/models/create-active-loan.dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveLoanService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  getBorrowerLoans(): Observable<ActiveLoanDTO[]> {
    return this.http.get<ActiveLoanDTO[]>(`${CONFIG.MAIN_URL}/active-loans/get-borrower-loans`);
  }

  getInvestorLoans(): Observable<ActiveLoanDTO[]> {
    return this.http.get<ActiveLoanDTO[]>(`${CONFIG.MAIN_URL}/active-loans/get-investor-loans`);
  }

  createActiveLoan(activeLoan: CreateActiveLoanDTO): Observable<ActiveLoanDTO> {
    // console.log(activeLoan)
    return this.http.post<ActiveLoanDTO>(`${CONFIG.MAIN_URL}/active-loans/create-active-loan`, activeLoan);
  }
}
