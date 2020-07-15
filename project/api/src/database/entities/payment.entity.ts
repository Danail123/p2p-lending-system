import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ActiveLoan } from './active-loan.entity';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => ActiveLoan, loan => loan.payments)
    loan: Promise<ActiveLoan>;
}
