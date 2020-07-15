import { Component, Input } from "@angular/core";
import { ActiveLoanDTO } from 'src/app/features/borrower-screen/models/active-loan.dto';

@Component({
    selector: 'app-view-all-investments',
    templateUrl: '/veiw-all-investments.cmponent.html',
    styleUrls: ['/view-all-investments.component.css']
})
export class ViewAllInvestmentsComponent {
    @Input() investment: ActiveLoanDTO;

    constructor () {
    }
}