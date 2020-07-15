import { Length, Matches, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDTO {

    @ApiModelProperty({ default: 'test500' })
    @Length(3, 16)
    @IsNotEmpty()
    @IsString()
    username: string;

    // Matches passwords with minimum five characters, at least one letter and one number
    @ApiModelProperty({ default: 'test500' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, {
        message:
            'The password must be minimum five characters, at least one letter and one number',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
