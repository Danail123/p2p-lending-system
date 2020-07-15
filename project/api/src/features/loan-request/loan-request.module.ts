import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoanRequest } from "../../database/entities/loan-request.entity";
import { LoanRequestsService } from "./loan-request.service";
import { LoanRequestsController } from "./loan-request.controller";
import { User } from "../../database/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([LoanRequest, User])],
    providers: [LoanRequestsService],
    controllers: [LoanRequestsController]
})
export class LoanRequestModule { }
