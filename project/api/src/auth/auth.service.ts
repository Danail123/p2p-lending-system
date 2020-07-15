import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../features/users/users.service';
import { User } from '../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserDataDTO } from '../features/users/models/user-data.dto';
import { LoginUserDTO } from '../features/users/models/login-user.dto';
import { LendingSystemError } from '../middleware/exceptions/lending-system.error';
import { UserPayloadDTO } from '../features/users/models/user-payload.dto';

@Injectable()
export class AuthService {
    private readonly blacklist: string[] = [];

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async singIn(user: LoginUserDTO) {
        const foundUser: User = await this.usersService.findUserByUsername(user.username);

        if (!foundUser) {
            throw new LendingSystemError('User with such username doest not exist!', 400);
        }
        if (!(await this.usersService.validateUserPassword(user))) {
            throw new LendingSystemError('Invalid password!', 400);
        }

        if (foundUser.isBanned) {
            throw new LendingSystemError(`Sorry you can't log in, because you are BANNED!`, 400);
        }

        const payload: UserPayloadDTO = {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
            proposals: await foundUser.proposals,
        };

        return {
            token: await this.jwtService.signAsync(payload),
        };
    }

    blacklistToken(token: string): void {
        this.blacklist.push(token);
    }

    isTokenBlacklisted(token: string): boolean {
        return this.blacklist.includes(token);
    }
}
