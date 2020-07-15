import { Controller, Get, UseGuards, UseInterceptors, Post, Param, Body, ValidationPipe } from "@nestjs/common";
import { AuthGuardWithBlacklisting } from "../../middleware/guards/blacklist.guard";
import { TransformInterceptor } from "../../middleware/transformer/interceptors/transform.interceptor";
import { LoanRequestDTO } from "../loan-request/models/loan-request.dto";
import { LoanProposalService } from "./loan-proposal.service";
import { LoanProposalDTO } from "./models/loan-proposal.dto";
import { InjectUser } from "../../middleware/decorators/user.decorator";
import { User } from "../../database/entities/user.entity";
import { CreateProposalDTO } from "./models/create-proposal.dto";
import { LoanProposal } from "../../database/entities/loan-Proposal.entity";
import { UserDataDTO } from "../users/models/user-data.dto";

@Controller('loan-proposals')
export class LoanProposalsController {
    constructor(
        private readonly loanProposalsService: LoanProposalService
    ) { }

    @Post('create-proposal')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(LoanProposalDTO))
    async createProposal(
        @InjectUser() user: User,
        @Body() proposal: CreateProposalDTO,
    ): Promise<LoanProposal> {

        
        return await this.loanProposalsService.createProposal(proposal, user)
    }

    @Get('get-request-proposals')
    @UseGuards(AuthGuardWithBlacklisting)
    @UseInterceptors( new TransformInterceptor(LoanProposalDTO))
    async getRequestProposals(
        @Body() request: LoanRequestDTO
    ): Promise<LoanProposal[]> {
        return await this.getRequestProposals(request);
    }
    
}