import { Publish } from "../../../middleware/transformer/decorators/publish";

export class ActiveLoanDTO {
    @Publish()
    id: number;
    @Publish()
    lenderId: string;

    @Publish()
    borrowerId: string;

    @Publish()
    amount: number;

    @Publish()
    period: number;

    @Publish()
    interestRate: number;

    @Publish()
    totalInterestAdded: number;

    @Publish()
    penaltyRate: number;

    @Publish()
    totalPenaltyAdded: number;

    @Publish()
    isDeleted: boolean;
}
