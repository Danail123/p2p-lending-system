import { SharedModule } from './../../shared/shared.module';
import { ViewAllRequestsComponent } from './all-requests/get-all-requests/view-all-requests.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { ViewRequestComponent,} from './all-requests/view-request/view-request.component';
import { InvestmentsRoutingModule } from './investment-routing.module';
import { CreateProposalModalContent } from './create-proposal-modal/create-proposal.modal';
import { GetInvestorLoansResolver } from 'src/app/core/services/get-investor-loans.resolver';
import { InvestmentsComponent } from './investments/get-all-investments/investments.component';
import { ViewAllInvestmentsComponent } from './investments/view-all-investments/view-all-investments.component';
import { ForeignRequestsResolver } from 'src/app/core/services/get-foreign-loans-resolver.service';

@NgModule({
  declarations: [
    ViewAllRequestsComponent,
    InvestmentsComponent,
    ViewRequestComponent,
    CreateProposalModalContent,
    ViewAllInvestmentsComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InvestmentsRoutingModule
    
  ],
  providers: [GetInvestorLoansResolver, ForeignRequestsResolver],
  exports:[ MatDialogModule, CreateProposalModalContent],
  entryComponents:[ CreateProposalModalContent],
 
})
export class InvestmentModule { }
