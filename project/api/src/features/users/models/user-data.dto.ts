import { LoanProposal } from './../../../database/entities/loan-Proposal.entity';
import { Expose } from 'class-transformer';
import { UserRole } from '../enums/user-role.enum';
import { Publish } from '../../../middleware/transformer/decorators/publish';
import { ActiveLoanDTO } from '../../active-loan/models/active-loan.dto';
import { LoanRequestDTO } from 'src/features/loan-request/models/loan-request.dto';
import { LoanProposalDTO } from 'src/features/loan-proposal/models/loan-proposal.dto';

export class UserDataDTO {

    @Publish()
    id: string;

    @Publish()
    @Expose()
    username: string;

    @Publish()
    @Expose()
    email: string;

    @Publish()
    @Expose()
    role: UserRole;

    @Publish()
    isBanned: boolean;

    @Publish()
    proposals: LoanProposalDTO[];

    @Publish()
    requests: LoanRequestDTO[];

    @Publish()
    balance: number;

    @Publish()
    investments: ActiveLoanDTO;
}
