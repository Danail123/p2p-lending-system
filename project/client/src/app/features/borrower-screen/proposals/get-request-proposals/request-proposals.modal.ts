import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogRequestData } from "src/app/common/interfaces/dialog-data-request";

import * as moment from 'moment';
import { LoanRequestDTO } from '../../models/loan-request.dto';
import { LoanProposalDTO } from 'src/app/features/investment-screen/models/loan-proposal.dto';
@Component({
  selector: "app-request-proposals",
  templateUrl: "/request-proposals.modal.html"
})
export class RequestProposalsModal implements OnInit {
  request: LoanRequestDTO;
  requestProposals: LoanProposalDTO[];

  constructor(
    public dialogRef: MatDialogRef<RequestProposalsModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogRequestData
  ) {
    this.request = data.request;
    this.requestProposals = this.request.loanProposals
    // this.requestProposals.forEach((proposal) => console.log(proposal.lender))
    // console.log(this.requestProposals)
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
