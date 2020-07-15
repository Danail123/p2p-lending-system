import { Publish } from "../../../middleware/transformer/decorators/publish";

export class CreateProposalDTO {
    @Publish()
    amount: number;

    @Publish()
    period: number;

    @Publish()
    interestRate: number;

    @Publish()
    penaltyRate: number;

    @Publish()
    requestId: string;
}