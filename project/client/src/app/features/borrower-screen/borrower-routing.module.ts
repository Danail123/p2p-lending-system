import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MyRequestsComponent } from "./requests/my-requests/my-requests.component";
import { DebtsComponent } from "./Debts/all-active-loans.component";
import { MyRequestsResolver } from 'src/app/core/services/get-my-loans-resolver.service';
import { GetBorrowerLoansResolver } from 'src/app/core/services/get-borrwer-loans.reslver';

const routes: Routes = [
  { path: "", component: MyRequestsComponent, pathMatch: "full", resolve: {
    requests: MyRequestsResolver} 
  },

  { path: "debts", component: DebtsComponent, pathMatch: "full", resolve: {
    debts: GetBorrowerLoansResolver} 
  },


  // { path: "", component: ActiveLoanComponent, pathMatch: "full", resolve: {
  //   requests: RequestsResolver} 
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowerRoutingModule {}
