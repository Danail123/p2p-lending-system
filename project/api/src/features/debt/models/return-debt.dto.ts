import { UserDataDTO } from '../../users/models/user-data.dto';
import { Publish } from '../../../middleware/transformer/decorators/publish';
import { User } from '../../../database/entities/user.entity';
import { DebtStatus } from '../enum/debt-status.enum';
import { Expose } from 'class-transformer';

export class ReturnDebtDTO {
    id: string;
    period: number;
    amount: number;
    status: DebtStatus;
    isPartial: boolean;
    @Publish(UserDataDTO)
    @Expose()
    user: User;
}
