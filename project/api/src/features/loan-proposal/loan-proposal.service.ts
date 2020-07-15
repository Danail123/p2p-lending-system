import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoanProposal } from "../../database/entities/loan-Proposal.entity";
import { Repository } from "typeorm";
import { User } from "../../database/entities/user.entity";
import { CreateProposalDTO } from "./models/create-proposal.dto";
import { LoanRequest } from "../../database/entities/loan-request.entity";
import { LoanRequestDTO } from "../loan-request/models/loan-request.dto";
import { UserDataDTO } from "../users/models/user-data.dto";

@Injectable()
export class LoanProposalService {
    constructor(
        @InjectRepository(LoanProposal) private readonly LoanProposalsRepo: Repository<LoanProposal>,
        @InjectRepository(LoanRequest) private readonly LoanRequestRepo: Repository<LoanRequest>,
        ) {}
    
    async createProposal(proposal: CreateProposalDTO, user: User): Promise<LoanProposal> {

        
        const foundRequest: LoanRequest = await this.LoanRequestRepo.findOne(proposal.requestId);

        const createdProposal: LoanProposal = this.LoanProposalsRepo.create(proposal);

        

        createdProposal.lender = Promise.resolve(user);
        createdProposal.request = Promise.resolve(foundRequest);

        return await this.LoanProposalsRepo.save(createdProposal);
    }

    async getRequestProposals(request: LoanRequestDTO): Promise<LoanProposal[]> {
        let foundProposals: LoanProposal[] = await this.LoanProposalsRepo.find({
            where: {request : request}, 
            relations: ['lender'] 
        })
        return foundProposals;
    }
}