import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { LoanProposal } from "./loan-Proposal.entity";
import { User } from "./user.entity";
import { UserDataDTO } from "../../features/users/models/user-data.dto";


@Entity('loan-requests')
export class LoanRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    
    @Column('int', {default: 0})
    amount: number;
    
    @Column('int', {default: 0})
    period: number;
    
    @Column('boolean', {default: false})
    isDeleted: boolean;
    
    @ManyToOne(type => User, borrower => borrower.requests)
    borrower: Promise<User>;

    @OneToMany(type => LoanProposal, loanProposals => loanProposals.request)
    loanProposals: Promise<LoanProposal[]>;
    
}