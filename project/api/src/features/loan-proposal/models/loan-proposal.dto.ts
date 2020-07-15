import { Publish } from "../../../middleware/transformer/decorators/publish";
import { LoanRequestDTO } from "../../../features/loan-request/models/loan-request.dto";
import { User } from "../../../database/entities/user.entity";
import { UserDataDTO } from "../../../features/users/models/user-data.dto";

export class LoanProposalDTO {
    @Publish()
    id: string;
    
    @Publish()
    amount: number;
    
    @Publish()
    period: number;
    
    @Publish()
    request: LoanRequestDTO;
    
    @Publish()
    penaltyRate: number;
    
    @Publish()
    interestRate: number;
    
    @Publish()
    lender: UserDataDTO;
}
