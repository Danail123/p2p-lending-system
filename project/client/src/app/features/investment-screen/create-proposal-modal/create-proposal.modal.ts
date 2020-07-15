import { CreateLoanProposalDTO } from '../models/create-loan-proposal.dto';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Inject, Optional, OnInit, Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoanProposalService } from 'src/app/core/services/loan-proposal.service';
import { DialogDataProposaModal } from 'src/app/common/interfaces/dialog-data-interface';
import { LoanProposalDTO } from '../models/loan-proposal.dto';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestDTO } from '../../borrower-screen/models/loan-request.dto';

@Component({
    selector: 'app-create-loan-proposal',
    templateUrl: '/create-proposal.modal.html'
  })
  export class CreateProposalModalContent implements OnInit {
  
    public createLoanProposalForm: FormGroup;
    loanRequestId: string;
    result: CreateLoanProposalDTO = new CreateLoanProposalDTO();
    currentRequest: LoanRequestDTO;
  
    constructor(
      @Optional() public dialogRef: MatDialogRef<CreateProposalModalContent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogDataProposaModal,
      private readonly formBuilder: FormBuilder,
      private loanProposalService: LoanProposalService,
      private readonly loanRequestService: LoanRequestService,
    ) { 
        this.loanRequestService.getCurrentRequest().subscribe(
            data => this.currentRequest = data
        )
    }
  
    public ngOnInit() {
      this.createLoanProposalForm = this.formBuilder.group({
        amount: ['', [Validators.required, Validators.min(this.currentRequest.amount), Validators.max(this.currentRequest.amount)]],
        period: ['', [Validators.required, Validators.min(1), Validators.max(60)]],
        penaltyRate: ['', [Validators.required, Validators.min(1)]],
        interestRate: ['', [Validators.required, Validators.min(1)]]
      });
    }
  
    createProposal(proposal: LoanProposalDTO) {
        let proposalToCreate: CreateLoanProposalDTO = {...proposal, requestId: this.currentRequest.id}
      
        this.loanProposalService.createProposal(proposalToCreate).subscribe(
          (data) => {
          this.loanProposalService.setCreatedProposal(data)
        }
      )
      this.createLoanProposalForm.reset()
    }
  
    onNoClick() {
      this.dialogRef.close();
    }
  }