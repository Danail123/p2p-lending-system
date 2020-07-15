import { Controller, Get, UseGuards, UseInterceptors, Post, Body } from "@nestjs/common";
import { AuthGuardWithBlacklisting } from "../../middleware/guards/blacklist.guard";
import { TransformInterceptor } from "../../middleware/transformer/interceptors/transform.interceptor";
import { LoanRequestDTO } from "./models/loan-request.dto";
import { User } from "../../database/entities/user.entity";
import { LoanRequest } from "../../database/entities/loan-request.entity";
import { LoanRequestsService } from "./loan-request.service";
import { InjectUser } from "../../middleware/decorators/user.decorator";
import { CreateRequestDTO } from "./models/create-request.dto";
import { UserDataDTO } from "../users/models/user-data.dto";

@Controller('loan-requests')
export class LoanRequestsController {

    constructor (
        private readonly LoanRequestService: LoanRequestsService,
    ) {}
    
    @Post('create-request')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(LoanRequestDTO))
    async createRequest(
        @Body() request: CreateRequestDTO,
        @InjectUser() user: User,
    ): Promise<LoanRequest>{

        return await this.LoanRequestService.createRequest(request, user);
    }



    @Get('get-all-existing-requests')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(LoanRequestDTO))
    async getAllExistingRequests(
    ): Promise<LoanRequest[]> {
        return await this.LoanRequestService.getAllExistingRequests();
    }

    @Get('get-my-requests')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(LoanRequestDTO))
    async getMyRequests(
        @InjectUser() user: User,
    ): Promise<LoanRequest[]> {
        return await this.LoanRequestService.getMyRequests(user);
    }

    @Get('get-foreign-requests')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(LoanRequestDTO))
    async getForeignRequests(
        @InjectUser() user: User,
    ): Promise<LoanRequest[]> {
        return await this.LoanRequestService.getForeignRequests(user);
    }



}
