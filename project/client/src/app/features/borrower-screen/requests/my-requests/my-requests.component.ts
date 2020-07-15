import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { LoanProposalService } from 'src/app/core/services/loan-proposal.service';

import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateRequestModalContent } from '../../create-request/create-request.modal';
import { LoanRequestDTO } from '../../models/loan-request.dto';
import { UserDTO } from 'src/app/features/users/models/user.dto';
import { LoanProposalDTO } from 'src/app/features/investment-screen/models/loan-proposal.dto';


@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  allUserRequests: LoanRequestDTO[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public dialog: MatDialog,
  ) {

   }
   
  ngOnInit() {
    
    this.route.data.subscribe(
      ({requests}) => {
      this.allUserRequests = requests

      this.allUserRequests.forEach((request) => request.loanProposals.forEach((proposal) => console.log(proposal.amount)))
    })

  }
  goToDebts() {
    this.router.navigate(['loans','debts'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRequestModalContent, {
      width: '250px',
    });

    dialogRef.afterClosed()
  }
}
