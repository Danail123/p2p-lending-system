import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanRequestDTO } from 'src/app/features/borrower-screen/models/loan-request.dto';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserDTO } from 'src/app/features/users/models/user.dto';
import { UsersService } from 'src/app/core/services/users.service';
import { LoanProposalDTO } from '../../models/loan-proposal.dto';
import { MatDialog } from '@angular/material';
import { CreateLoanProposalDTO } from '../../models/create-loan-proposal.dto';
import { LoanProposalService } from 'src/app/core/services/loan-proposal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-all-requests',
  templateUrl: './view-all-requests.component.html',
  styleUrls: ['./view-all-requests.component.css']
})
export class ViewAllRequestsComponent implements OnInit {


  allUserRequests: LoanRequestDTO[];
  allForeignRequests: LoanRequestDTO[];
  loggedUserId: string;
  loggedUsserInfo: UserDTO;
  proposals: LoanProposalDTO[];
  requests: LoanRequestDTO[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loanRequestService: LoanRequestService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {

   }

  ngOnInit() {
    this.authService.loggedUser$.subscribe(
      (user) => { this.loggedUserId = user.id }
    );

    this.usersService.getUserById(this.loggedUserId).subscribe(
      (user: UserDTO) => { this.loggedUsserInfo = user }
    )

    this.route.data.subscribe(
      ({requests}) => this.allForeignRequests = requests
    )
  }

  goToInvestments() {
    this.router.navigate(['investments','my-investments'])
  }
}
