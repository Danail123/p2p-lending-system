import { UserSummaryComponent } from './user-summary-component/user-summary.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [UserSummaryComponent],
  imports: [
    SharedModule
  ],
  exports: [
    UserSummaryComponent
  ]
})
export class UserSummaryModule { }
