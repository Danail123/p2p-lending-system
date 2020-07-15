import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveLoanDTO } from '../../../borrower-screen/models/active-loan.dto';
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit{

  investments: ActiveLoanDTO[];

  constructor(
    private readonly route: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.route.data.subscribe(
      ({investments}) => {this.investments = investments}
    )
  }

}
