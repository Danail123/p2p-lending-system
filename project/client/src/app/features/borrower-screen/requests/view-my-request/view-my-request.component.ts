import { Component, OnInit, Input, Optional, Inject, EventEmitter, Output } from '@angular/core';
import { LoanRequestDTO } from '../../models/loan-request.dto';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DialogDataProposaModal } from 'src/app/common/interfaces/dialog-data-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanProposalService } from 'src/app/core/services/loan-proposal.service';
import { Subscription } from 'rxjs';
import { CreateLoanRequestDTO } from '../../models/create-loan-request.dto';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { RequestProposalsModal } from '../../proposals/get-request-proposals/request-proposals.modal';
import { LoanProposalDTO } from '../../../investment-screen/models/loan-proposal.dto';

@Component({
  selector: 'app-view-my-request',
  templateUrl: './view-my-request.component.html',
  styleUrls: ['./view-my-request.component.css']
})
export class ViewMyRequestComponent implements OnInit {

  @Input() request: LoanRequestDTO;
  requestProposals: LoanProposalDTO[];

  constructor(
    public dialog: MatDialog,
  ) {
    
  }

  ngOnInit() {
    this.requestProposals = this.request.loanProposals
    // this.requestProposals.forEach((el) => console.log(el.lender))
  }

  openDialogForRequestProposals(){
    const dialogRef = this.dialog.open(RequestProposalsModal, {
      width: '250px',
      data: {
        request: this.request
      }
    });


    dialogRef.afterClosed()
  }

}


