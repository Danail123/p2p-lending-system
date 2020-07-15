import { Component, OnInit, Input, EventEmitter, Output, Optional, Inject } from '@angular/core';
import { LoanRequestDTO } from 'src/app/features/borrower-screen/models/loan-request.dto';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CreateLoanProposalDTO } from '../../models/create-loan-proposal.dto';
import { LoanProposalService } from 'src/app/core/services/loan-proposal.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogDataProposaModal } from 'src/app/common/interfaces/dialog-data-interface';
import { Subscription } from 'rxjs';
import { CreateProposalModalContent } from '../../create-proposal-modal/create-proposal.modal';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  @Input() request: LoanRequestDTO;
  disabled: false;

  constructor(
    private readonly loanRequestService: LoanRequestService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProposalModalContent, {
      width: '250px',
    });
    this.loanRequestService.setCurrentRequest(this.request)
    dialogRef.afterClosed()
  }
}
