import { User } from './../../database/entities/user.entity';
import { UsersService } from './../../features/users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDataDTO } from '../../features/users/models/user-data.dto';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.jwtSecret,
            ignoreExpiration: false,
        });
    }

    public async validate(payload: UserDataDTO): Promise<User> {
        const user = await this.usersService.findUserByUsername(
            payload.username,
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
