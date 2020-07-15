import { Publish } from "../../../middleware/transformer/decorators/publish";
import { LoanProposal } from "../../../database/entities/loan-Proposal.entity";
import { LoanProposalDTO } from "src/features/loan-proposal/models/loan-proposal.dto";
import { User } from "../../../database/entities/user.entity";
import { UserDataDTO } from "../../../features/users/models/user-data.dto";

export class LoanRequestDTO {
    @Publish()
    id: string;
    
    @Publish()
    borrower: UserDataDTO;

    @Publish()
    amount: number;

    @Publish()
    period: number;

    @Publish()
    loanProposals: LoanProposalDTO[];
}