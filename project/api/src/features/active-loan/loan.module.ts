import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActiveLoan } from "../../database/entities/active-loan.entity";
import { User } from "../../database/entities/user.entity";
import { ActiveLoanController } from "./loan.controller";
import { ActiveLoanService } from "./loan.service";

@Module({
    imports: [TypeOrmModule.forFeature([ActiveLoan, User])],
    providers: [ActiveLoanService],
    controllers: [ActiveLoanController]
})
export class ActiveLoanModule { }