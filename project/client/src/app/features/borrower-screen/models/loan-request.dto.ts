import { LoanProposalDTO } from '../../investment-screen/models/loan-proposal.dto';
import { UserDTO } from '../../users/models/user.dto';

export class LoanRequestDTO {

    id: string;
    
    borrower: UserDTO; 

    amount: number;

    period: number;

    loanProposals: LoanProposalDTO[];
}