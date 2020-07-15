import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoanProposal } from "../../database/entities/loan-Proposal.entity";
import { LoanRequest } from "../../database/entities/loan-request.entity";
import { LoanProposalService } from "./loan-proposal.service";
import { LoanProposalsController } from "./loan-proposal.controller";

@Module({
    imports: [TypeOrmModule.forFeature([LoanProposal, LoanRequest])],
    providers: [LoanProposalService],
    controllers: [LoanProposalsController],
})
export class LoanProposalModule {}

