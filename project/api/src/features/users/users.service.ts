import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './models/create-user.dto';
import { UserRole } from './enums/user-role.enum';
import * as crypto from 'crypto-js';
import { LoginUserDTO } from './models/login-user.dto';
import { LendingSystemError } from '../../middleware/exceptions/lending-system.error';
import { UserDataDTO } from './models/user-data.dto';
import { ActiveLoanDTO } from '../active-loan/models/active-loan.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

    async createUser(user: CreateUserDTO): Promise<User> {
        const uniqueUsername = await this.usersRepository.findOne({
            username: user.username,
        });

        const uniqueEmail = await this.usersRepository.findOne({
            email: user.email,
        });

        
        /* Add something to validate password, cuz error comming from CreateUserDTO
        "The password must be minimum five characters, at least one letter and one number"
        */

        if (uniqueUsername) {
            throw new LendingSystemError('User with this username already exist!', 400);
        }

        if (uniqueEmail) {
            throw new LendingSystemError('User with this email already exist!', 400);
        }

        return await this.usersRepository.save({
            ...user,
            password: crypto.SHA256(user.password).toString(),
            role: UserRole.User,
        });
    }

    async getAllUsers(): Promise<User[]> {
        const foundUsers: User[] = await this.usersRepository.find(
            { where: { role: UserRole.User, isDeleted: false } });


        if (!foundUsers) {
            throw new LendingSystemError('There is no users', 400);
        }
        
        return foundUsers;
    }

    async getUserById(userId: string): Promise<User> {
        
        
        const foundUser: User = await this.usersRepository.findOne(
            { where: { id: userId },  relations: ['proposals', 'requests'] });
        this.validateUser(foundUser);


        return foundUser;
    }

    async banUser(userId: string): Promise<User> {
        const foundUser: User = await this.usersRepository.findOne(userId);
        this.validateUser(foundUser);

        if (foundUser.role === UserRole.Admin) {
            throw new LendingSystemError('You cannot ban a admin!', 400);
        }

        if (foundUser.isBanned === true) {
            throw new LendingSystemError('User is already banned!', 400);
        }

        return await this.usersRepository.save({ ...foundUser, isBanned: true, karmaPoints: -10 });
    }

    async unBanUser(userId: string): Promise<User> {
        const foundUser: User = await this.usersRepository.findOne(userId);
        this.validateUser(foundUser);

        if (foundUser.isBanned === false) {
            throw new LendingSystemError('User is already unbanned!', 400);
        }

        return await this.usersRepository.save({ ...foundUser, isBanned: false });
    }

    async deleteUser(userId: string): Promise<User> {
        const foundUser: User = await this.usersRepository.findOne(userId);
        this.validateUser(foundUser);

        if (foundUser.role === UserRole.Admin) {
            throw new LendingSystemError('You cannot delete an admin!', 400);
        }

        if (foundUser.isDeleted === true) {
            throw new LendingSystemError('User is already deleted!', 400);
        }

        return await this.usersRepository.save({ ...foundUser, isDeleted: true });
    }

    async unDeleteUser(userId: string): Promise<User> {
        const foundUser: User = await this.usersRepository.findOne(userId);
        this.validateUser(foundUser);

        if (foundUser.isDeleted === false) {
            throw new LendingSystemError('User is already undeleted!', 400);
        }

        return await this.usersRepository.save({ ...foundUser, isDeleted: false });
    }

    // Used in AuthService
    async findUserByUsername(username: string): Promise<User> {
        const foundUser: User = await this.usersRepository.findOne({
            username,
            isDeleted: false,
        });

        return foundUser;
    }

    async validateUserPassword(user: LoginUserDTO): Promise<boolean> {
        const foundUser: User = await this.usersRepository.findOne({
            username: user.username,
        });

        if (crypto.SHA256(user.password).toString() === foundUser.password) {
            return true;
        }

        return false;
    }

    async deposit(userId: string, AmountToBeDeposited: number): Promise<User> {
        const foundUser = await this.usersRepository.findOne(userId);
        foundUser.balance += AmountToBeDeposited;

        return this.usersRepository.save({
            ...foundUser, balance: foundUser.balance,
        });
    }

    async withdraw(userId: string, AmountToBeWithDrawn: number): Promise<User> {
        const foundUser = await this.usersRepository.findOne(userId);
        if (foundUser.balance < AmountToBeWithDrawn) {
            throw new LendingSystemError('You cant withdraw more money than you have ;)');
        }

        foundUser.balance -= AmountToBeWithDrawn;

        return await this.usersRepository.save({
            ...foundUser, balance: foundUser.balance,
        });
    }

    // async getAllInvestments(userId: string): Promise<ActiveLoanDTO[]> {
    //     const foundUser = await this.usersRepository.findOne(userId);
    //    let allInvestmentsArray: ActiveLoanDTO[] = [];

    //     allInvestmentsArray = foundUser.investments;

    //     return allInvestmentsArray;
    // }

    // Check if user is falsy
    private validateUser(user: User): void {
        if (!user) {
            throw new LendingSystemError('User with this ID doesn\'t exist!', 400);
        }
    }
}
