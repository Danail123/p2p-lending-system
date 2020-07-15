import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDataDTO } from '../users/models/user-data.dto';
import { ActiveLoan } from '../../database/entities/active-loan.entity';
import { ActiveLoanDTO } from './models/active-loan.dto';
import { CreateActiveLoanDTO } from './models/create-active-loan.dto';

@Injectable()
export class ActiveLoanService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        @InjectRepository(ActiveLoan) private readonly activeLoansRepository: Repository<ActiveLoan>,
        ) { }

    async createActiveLoan(activeLoan: CreateActiveLoanDTO): Promise<ActiveLoan> {
        // console.log(activeLoan.lenderId)
        const foundLender: User = await this.usersRepository.findOne({
            where: {id: activeLoan.lenderId}
        })
        // console.log(foundLender)
        const foundBorrower: User = await this.usersRepository.findOne({
            where: {id: activeLoan.borrowerId}
        })

        const createdActiveLoan: ActiveLoan = this.activeLoansRepository.create(activeLoan)
        
        createdActiveLoan.payments = Promise.resolve([]);
        createdActiveLoan.borrower = Promise.resolve(foundBorrower);
        createdActiveLoan.lender = Promise.resolve(foundLender);

        return this.activeLoansRepository.save(createdActiveLoan);
    }

    async getBorrowerActiveLoans (user: User): Promise<ActiveLoan[]> {
        const foundLoans: ActiveLoan[] = await this.activeLoansRepository.find({
            where: {isDeleted: false, borrower: user},
            relations: ['borrower', 'lender', 'payments']
        })
        return foundLoans;
    }

    
    async getInvestorActiveLoans (user: User): Promise<ActiveLoan[]> {
        const foundLoans: ActiveLoan[] = await this.activeLoansRepository.find({
            where: {isDeleted: false, lender: user},
            relations: ['borrower', 'lender', 'payments']
        })
        return foundLoans;
    }


}
