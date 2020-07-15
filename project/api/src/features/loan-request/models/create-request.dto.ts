import { Publish } from "../../../middleware/transformer/decorators/publish";

export class CreateRequestDTO {
    @Publish()
    amount: number;

    @Publish()
    period: number;
}