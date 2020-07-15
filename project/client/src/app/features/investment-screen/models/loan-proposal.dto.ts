import { LoanRequestDTO } from 'src/app/features/borrower-screen/models/loan-request.dto';
import { UserDTO } from 'src/app/features/users/models/user.dto';

export class LoanProposalDTO {
    id: string;
    amount: number;
    period: number;
    request: LoanRequestDTO;
    penaltyRate: number;
    interestRate: number;
    lender: UserDTO;
}