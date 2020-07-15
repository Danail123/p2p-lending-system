import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuardWithBlacklisting extends AuthGuard('jwt') implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
        super();
    }

    
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        if (!(await super.canActivate(context))) {
            return false;
        }

        
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (this.authService.isTokenBlacklisted(token)) {
            throw new UnauthorizedException('bugg');
        }

        return true;
    }
}
