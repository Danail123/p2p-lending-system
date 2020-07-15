import { UserDTO } from '../../users/models/user.dto';

export class CreateActiveLoanDTO {

    lenderId: string;

    borrowerId: string;

    // createdOn: Date;

    amount: number;

    period: number;

    interestRate: number;

    penaltyRate: number;
}