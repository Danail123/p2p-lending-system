import { BorrowerRoutingModule } from './borrower-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { MyRequestsComponent } from './requests/my-requests/my-requests.component';
import { ViewMyRequestComponent,  } from './requests/view-my-request/view-my-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { CreateRequestModalContent } from './create-request/create-request.modal';
import { RequestProposalsModal } from './proposals/get-request-proposals/request-proposals.modal';
import { DebtsComponent } from './Debts/all-active-loans.component';
import { MyRequestsResolver } from 'src/app/core/services/get-my-loans-resolver.service';
import { ViewProposals } from './proposals/view-request-proposals/view-proposals.compontnt';
import { GetBorrowerLoansResolver } from 'src/app/core/services/get-borrwer-loans.reslver';



@NgModule({
  declarations: [
    MyRequestsComponent,
    ViewMyRequestComponent,
    CreateRequestModalContent,
    RequestProposalsModal,
    DebtsComponent,
    ViewProposals
  ],
  imports: [
    SharedModule,
    BorrowerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MyRequestsResolver, GetBorrowerLoansResolver],
  exports:[ MatDialogModule, CreateRequestModalContent, RequestProposalsModal],
  entryComponents:[ CreateRequestModalContent, RequestProposalsModal],
})
export class BorrowerModule { }
