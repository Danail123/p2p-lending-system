import { DebtStatus } from '../../features/debt/enum/debt-status.enum';
import { User } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Payment } from './payment.entity';

@Entity('active-loans')
export class ActiveLoan {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column()
    // createdOn: Date;

    @Column('int', { nullable: false, default: 169 })
    amount: number;
    
    @Column('int', { nullable: false })
    period: number;
    
    @Column('decimal', {nullable: false})
    interestRate: number;
    
    @Column('decimal', {nullable: false})
    penaltyRate: number;

    @Column('boolean', { default: false })
    isDeleted: boolean;
    
    @OneToMany(type => Payment, payment => payment.loan)
    payments: Promise<Payment[]>;

    @ManyToOne(() => User, user => user.investments, )
    lender: Promise<User>;
    
    @ManyToOne(() => User, user => user.debts, )
    borrower: Promise<User>;
}
