import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from '../middleware/decorators/token.decorator';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuardWithBlacklisting } from '../middleware/guards/blacklist.guard';
import { LoginUserDTO } from '../features/users/models/login-user.dto';

@Controller('session')
@ApiUseTags('Auth Controller')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post()
    async loginUser(@Body() user: LoginUserDTO): Promise<{ token: string }> {
        return await this.authService.singIn(user);
    }

    @Delete()
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    async logoutUser(@Token() token: string): Promise<{ msg: string }> {
        this.authService.blacklistToken(token);

        return {
            msg: `Successful logout!`,
        };
    }
}
