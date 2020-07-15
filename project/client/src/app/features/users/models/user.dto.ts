import { UserRole } from 'src/app/common/enums/user-role.enum';
import { LoanProposalDTO } from '../../investment-screen/models/loan-proposal.dto';
import { LoanRequestDTO } from '../../borrower-screen/models/loan-request.dto';

export class UserDTO {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    isBanned: boolean;
    proposals: LoanProposalDTO[];
    requests: LoanRequestDTO[];
}
