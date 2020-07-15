import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { DebtStatus } from './enum/debt-status.enum';
import { LendingSystemError } from 'src/middleware/exceptions/lending-system.error';
import { ActiveLoan } from 'src/database/entities/active-loan.entity';
import { ActiveLoanDTO } from '../active-loan/models/active-loan.dto';

@Injectable()
export class DebtService {
    constructor(
        // DI repos and services
        @InjectRepository(ActiveLoan) private readonly loansRepo: Repository<ActiveLoan>,
    ) {}

    public async allDebt(): Promise<ActiveLoan[]> {
        const foundDebts: ActiveLoan[] = await this.loansRepo.find(
            {
                where: { isDeleted: false },
            },

        );

        if (!foundDebts) {
            throw new LendingSystemError('There are no debts', 400);
        }


        return foundDebts;
    }
}
