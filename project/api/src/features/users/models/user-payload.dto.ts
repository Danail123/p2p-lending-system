import { UserRole } from '../enums/user-role.enum';
import { LoanProposalDTO } from 'src/features/loan-proposal/models/loan-proposal.dto';
import { LoanProposal } from 'src/database/entities/loan-Proposal.entity';

export class UserPayloadDTO {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    proposals: LoanProposal[];
}
