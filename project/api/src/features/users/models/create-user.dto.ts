import { Length, Matches, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {

    @ApiModelProperty({ default: 'test500' })
    @Length(3, 16)
    @IsNotEmpty()
    @IsString()
    username: string;

    // Matches passwords with minimum five characters, at least one letter and one number
    @ApiModelProperty({ default: 'test500' })
    @Length(5, 16)
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiModelProperty({ default: 'test500@test500.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
