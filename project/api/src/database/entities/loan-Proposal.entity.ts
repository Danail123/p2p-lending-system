import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { LoanRequest } from "./loan-request.entity";
import { User } from "./user.entity";
import { UserDataDTO } from "../../features/users/models/user-data.dto";

@Entity('loanProposals')
export class LoanProposal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int', {default: 0})
    amount: number;
    
    @Column('int', {default: 0})
    period: number;
    
    @Column('decimal', {default: 0})
    interestRate: number;
    
    @Column('decimal', {default: 0})
    penaltyRate: number;
    
    @ManyToOne(type => User, lender => lender.proposals)
    lender: Promise<User>;

    @ManyToOne(type => LoanRequest, loanRequest => loanRequest.loanProposals)
    request: Promise<LoanRequest>;
}