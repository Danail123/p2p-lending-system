import { Injectable } from '@angular/core';
import { CreateLoanProposalDTO } from 'src/app/features/investment-screen/models/create-loan-proposal.dto';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { LoanProposalDTO } from 'src/app/features/investment-screen/models/loan-proposal.dto';
import { CONFIG } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { LoanRequestDTO } from 'src/app/features/borrower-screen/models/loan-request.dto';

@Injectable({
    providedIn: 'root'
})
export class LoanProposalService {

    constructor(
        private readonly http: HttpClient
    ) { }
    
    private createdPrposalSubject = new Subject<LoanProposalDTO>();

    createProposal(proposal: CreateLoanProposalDTO): Observable<LoanProposalDTO> {
        return this.http.post<LoanProposalDTO>(`${CONFIG.MAIN_URL}/loan-proposals/create-proposal`, proposal)
    }
    
    getRequestProposals(request: LoanRequestDTO): Observable<LoanProposalDTO[]> {
        return this.http.get<LoanProposalDTO[]>(`${CONFIG.MAIN_URL}/loan-proposals/get-request-proposals`)
    }


    setCreatedProposal(proposal: LoanProposalDTO) {
        this.createdPrposalSubject.next(proposal)
    }

    getProposalData(): Observable<LoanProposalDTO> {
        return this.createdPrposalSubject.asObservable();
    }

}
