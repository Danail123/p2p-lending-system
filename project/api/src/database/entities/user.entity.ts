
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { UserRole } from '../../features/users/enums/user-role.enum';
import { ActiveLoan } from './active-loan.entity';
import { ActiveLoanDTO } from '../../features/active-loan/models/active-loan.dto';
import { LoanProposal } from './loan-Proposal.entity';
import { LoanRequest } from './loan-request.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('nvarchar', { nullable: false, unique: true, length: 20 })
    username: string;

    @Column('nvarchar', { nullable: false })
    password: string;

    @Column('nvarchar', { nullable: false, unique: true, length: 30 })
    email: string;

    @Column({ type: 'enum', enum: UserRole, nullable: false })
    role: UserRole;

    @Column('int', { default: 0 })
    balance: number;

    @Column('boolean', { default: false })
    isBanned: boolean;

    @Column('boolean', { default: false })
    isDeleted: boolean;

    @OneToMany(type => ActiveLoan, debt => debt.borrower)
    debts: Promise<ActiveLoanDTO[]>;

    @OneToMany(type => ActiveLoan, investment => investment.lender)
    investments: Promise<ActiveLoanDTO[]>;

    @OneToMany(type  => LoanProposal, proposals => proposals.lender)
    proposals: Promise<LoanProposal[]>;

    @OneToMany(type => LoanRequest, requests => requests.borrower)
    requests: Promise<LoanRequest[]>;
}
