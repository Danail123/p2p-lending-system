import { Component, OnInit } from "@angular/core";
import { ActiveLoanService } from 'src/app/core/services/active-loan.service';
import { ActiveLoanDTO } from '../models/active-loan.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-all-active-loans',
    templateUrl: '/all-active-loans.component.html',
    styleUrls: ['/all-active-loans.component.css']
})
export class DebtsComponent implements OnInit{
    
    debts: ActiveLoanDTO[];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly activeLoanService: ActiveLoanService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ({debts}) => this.debts = debts
        )
    }
}
