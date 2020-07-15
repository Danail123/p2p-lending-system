import { Publish } from "../../../middleware/transformer/decorators/publish";
import { Payment } from "src/database/entities/payment.entity";
import { UserDataDTO } from "src/features/users/models/user-data.dto";
import { User } from "src/database/entities/user.entity";

export class CreateActiveLoanDTO {

    @Publish()
    lenderId: string;

    @Publish()
    borrowerId: string;

    // @Publish()
    // createdOn: Date;

    @Publish()
    amount: number;

    @Publish()
    period: number;

    @Publish()
    interestRate: number;

    @Publish()
    penaltyRate: number;
}