import { ReturnDebtDTO } from './models/return-debt.dto';
import { TransformInterceptor } from '../../middleware/transformer/interceptors/transform.interceptor';
import { Controller, Get, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { DebtService } from './debt.service';
import { ActiveLoan } from 'src/database/entities/active-loan.entity';
import { ActiveLoanDTO } from '../active-loan/models/active-loan.dto';

@Controller('debt')
@ApiUseTags('Debt Controller')
export class DebtController {
    constructor(private readonly debtService: DebtService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(new TransformInterceptor(ReturnDebtDTO))
    public async allDebt(): Promise<ActiveLoan[]> {
        return await this.debtService.allDebt();
        
    }
}
