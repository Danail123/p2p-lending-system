import { Controller, Post, UseGuards, UseInterceptors, Body, Get } from "@nestjs/common";
import { AuthGuardWithBlacklisting } from "../../middleware/guards/blacklist.guard";
import { TransformInterceptor } from "../../middleware/transformer/interceptors/transform.interceptor";
import { ActiveLoanDTO } from "./models/active-loan.dto";
import { ActiveLoanService } from "./loan.service";
import { CreateActiveLoanDTO } from "./models/create-active-loan.dto";
import { ActiveLoan } from "../../database/entities/active-loan.entity";
import { InjectUser } from "../../middleware/decorators/user.decorator";
import { User } from "../../database/entities/user.entity";

console.log('here')
@Controller('active-loans')
export class ActiveLoanController {

    constructor (
        private readonly LoanRequestService: ActiveLoanService,
    ) {}

    @Post('create-active-loan')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(ActiveLoanDTO))
    async createActiveLoan (
        @Body() activeLoan: CreateActiveLoanDTO,
    ): Promise<ActiveLoan> {
        return await this.LoanRequestService.createActiveLoan(activeLoan);
    }

    @Get('get-borrower-loans')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(ActiveLoanDTO))
    async getBorrowerLoans (
        @InjectUser() user: User,
    ): Promise<ActiveLoan[]> {
        return await this.LoanRequestService.getBorrowerActiveLoans(user);
    }

    
    @Get('get-investor-loans')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(ActiveLoanDTO))
    async getInvestorActiveLoans (
        @InjectUser() user: User,
    ): Promise<ActiveLoan[]> {
        return await this.LoanRequestService.getInvestorActiveLoans(user);
    }

}
