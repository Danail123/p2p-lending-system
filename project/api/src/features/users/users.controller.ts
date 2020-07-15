import { User } from './../../database/entities/user.entity';
import { AdminGuard } from './../../middleware/guards/admin.guard';
import { USER_STATUS } from './common/constants/user-status';
import { UpdateUserStatusDTO } from './models/update-user-status';
import { CreateUserDTO } from './models/create-user.dto';
import { Controller, Post, Body, ValidationPipe, Patch, Param, UseGuards, UseInterceptors, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDataDTO } from './models/user-data.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../../middleware/transformer/interceptors/transform.interceptor';
import { AuthGuardWithBlacklisting } from '../../middleware/guards/blacklist.guard';
import { ActiveLoanDTO } from '../active-loan/models/active-loan.dto';

@Controller('users')
@ApiUseTags('Users Controller')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Register a new user, need to be public part.
    @Post()
    @UseInterceptors(new TransformInterceptor(UserDataDTO))
    async registerUser(
        @Body(new ValidationPipe({ whitelist: true, transform: true })) user: CreateUserDTO,
    ): Promise<User> {
        return await this.usersService.createUser(user);
    }

    // Only for Admin and to test something in frond end! :D
    @Get()
    @UseGuards(AuthGuardWithBlacklisting, AdminGuard)
    @UseInterceptors(new TransformInterceptor(UserDataDTO))
    @ApiBearerAuth()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get('/:id')
    @UseGuards(AuthGuardWithBlacklisting)
    @ApiBearerAuth()
    async getUserById(
        @Param('id') userId: string,
    ): Promise<User> {
        return this.usersService.getUserById(userId);
    }

    // Need to be added Description for ban and Due!
    // Only for Admin!. Ban, unBan, Delete, UnDelete a user!
    @Patch('/:id')
    @UseGuards(AuthGuardWithBlacklisting, AdminGuard)
    @UseInterceptors(new TransformInterceptor(UserDataDTO))
    @ApiBearerAuth()
    async usersStatus(
        @Param('id') userId: string,
        @Body(new ValidationPipe({ transform: true, whitelist: true })) body: UpdateUserStatusDTO,
    ) {
        return await (this.usersService as any)[USER_STATUS[body.action]](userId);
    }

    @Patch('/:id/deposit/:amount')
    // @UseGuards(AuthGuardWithBlacklisting)
    // @ApiBearerAuth()
    async deposit(
        @Param('id') userId: string,
        @Param('amount') amountToBeDeposited: number,
    ): Promise<User> {
        return await this.usersService.deposit(userId, Number(amountToBeDeposited));
    }

    @Patch('/:id/withdraw/:amount')
    async withdraw(
        @Param('id') userId: string,
        @Param('amount') amountToBeWithdrawn: number,
    ): Promise<User> {
        return await this.usersService.withdraw(userId, Number(amountToBeWithdrawn));
    }

    // @Get('/:userId/getAllInv')
    // async getAllInvestments(
    //     @Param('userId') userId: string,
    // ): Promise<ActiveLoanDTO[]> {
    //     return await this.usersService.getAllInvestments(userId);
    // }
}
