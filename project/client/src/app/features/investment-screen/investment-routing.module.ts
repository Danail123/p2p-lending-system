import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllRequestsComponent } from './all-requests/get-all-requests/view-all-requests.component';
import { GetInvestorLoansResolver } from 'src/app/core/services/get-investor-loans.resolver';
import { InvestmentsComponent } from './investments/get-all-investments/investments.component';
import { ForeignRequestsResolver } from 'src/app/core/services/get-foreign-loans-resolver.service';

const routes: Routes = [
    { path: '', component: ViewAllRequestsComponent, pathMatch: 'full', canActivate: [AuthGuard], 
        resolve: {
            requests: ForeignRequestsResolver
        }
    },

    { path: "my-investments", component: InvestmentsComponent, pathMatch: "full", resolve: {
        investments: GetInvestorLoansResolver} 
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvestmentsRoutingModule { }