import { Component, Input } from "@angular/core";

import { ActiveLoanService } from 'src/app/core/services/active-loan.service';
import { LoanRequestDTO } from '../../models/loan-request.dto';
import { LoanProposalDTO } from 'src/app/features/investment-screen/models/loan-proposal.dto';
import { CreateActiveLoanDTO } from '../../models/create-active-loan.dto';

@Component({
    selector: "app-view-proposals",
    templateUrl: "/view-proposals.component.html",
    styleUrls: ["/view-proposals.component.css"]
})
export class ViewProposals {
    @Input() proposal: LoanProposalDTO;
    @Input() request: LoanRequestDTO;

    constructor (
        private activeLoanService: ActiveLoanService,
    ) {
        
    }


    async createActiveLoan (proposal: LoanProposalDTO) {
        console.log(this.proposal)
        console.log(this.proposal.lender)
        let createLoan: CreateActiveLoanDTO = {
            lenderId: this.proposal.lender.id ,
            borrowerId: this.request.borrower.id,
            amount: proposal.amount,
            period: proposal.period,
            interestRate: proposal.interestRate,
            penaltyRate: proposal.penaltyRate
        }

        // console.log(createLoan)

    
        this.activeLoanService.createActiveLoan(createLoan).subscribe();        
      }
}