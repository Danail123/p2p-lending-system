import { UpdateUserStatus } from './../enums/update-user-status';
import { IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserStatusDTO {
    @IsEnum(UpdateUserStatus)
    @ApiModelProperty({ enum: ['Ban', 'UnBan', 'Delete', 'UnDelete'] })
    action: UpdateUserStatus;
}
