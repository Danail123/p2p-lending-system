import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './features/users/users.module';
import { CoreModule } from './features/core.module';
import { LoanRequestModule } from './features/loan-request/loan-request.module';
import { LoanProposalModule } from './features/loan-proposal/loan-proposal.module';
import { ActiveLoanModule } from './features/active-loan/loan.module';

@Module({
  imports: [DatabaseModule, CoreModule, UsersModule, LoanRequestModule, LoanProposalModule, HttpModule, ActiveLoanModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
