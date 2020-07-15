import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CreateLoanRequestDTO } from "../models/create-loan-request.dto";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogDataProposaModal } from "src/app/common/interfaces/dialog-data-interface";
import { LoanRequestService } from "src/app/core/services/loan-request.service";
import { NotificationService } from 'src/app/core/notifications.service';
import { LoanRequestDTO } from '../models/loan-request.dto';

@Component({
  selector: "app-create-loan-request",
  templateUrl: "/create-request.modal.html"
})
export class CreateRequestModalContent implements OnInit {
  public createLoanRequestForm: FormGroup;
  allUserRequests: LoanRequestDTO[] = [];

  constructor(
    @Optional() public dialogRef: MatDialogRef<CreateRequestModalContent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogDataProposaModal,
    private notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private loanRequestService: LoanRequestService
  ) {}

  public ngOnInit() {
    this.createLoanRequestForm = this.formBuilder.group({
      amount: ["", [Validators.required, Validators.min(100), Validators.max(100000)]],
      period: ["", [Validators.required, Validators.min(1), Validators.max(60)]]
    });
  }
  
// Takes the data from the form and activates the function for creating a request in loanRequestService
  createRequest(request: CreateLoanRequestDTO) {
    this.loanRequestService.createRequest(request).subscribe(
        (data) => {
          this.allUserRequests.push(data), 
          this.loanRequestService.setCreatedRequest(data);
        },
        () => this.notificationService.error('Invalid proposal data!')
      )  
    
    this.createLoanRequestForm.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
