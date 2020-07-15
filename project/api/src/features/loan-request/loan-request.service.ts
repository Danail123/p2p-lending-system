import { Injectable } from "@nestjs/common";
import { LoanRequest } from "../../database/entities/loan-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not } from "typeorm";
import { LoanRequestDTO } from "./models/loan-request.dto";
import { User } from "../../database/entities/user.entity";
import { CreateRequestDTO } from "./models/create-request.dto";
import { UserDataDTO } from "../users/models/user-data.dto";
import { request } from "express";

@Injectable()
export class LoanRequestsService {
    constructor (@InjectRepository(LoanRequest) private readonly loanRequestRepo: Repository<LoanRequest>) {}

    async createRequest(request: CreateRequestDTO, user: User): Promise<LoanRequest> {
        const createdRequest: LoanRequest = this.loanRequestRepo.create(request);

        createdRequest.loanProposals = Promise.resolve([]);
        createdRequest.borrower = Promise.resolve(user);

        return await this.loanRequestRepo.save(createdRequest);
    }


    async getAllExistingRequests(): Promise<LoanRequest[]> {
        let foundRequests: LoanRequest[] = await this.loanRequestRepo.find(
            {where: {isDeleted: false}, relations: ['borrower', 'loanProposals']});

        return foundRequests;
    }

    async getMyRequests(user: User): Promise<LoanRequest[]> {
        let foundRequests: LoanRequest[] = await this.loanRequestRepo.find({
            where: {borrower: user}, 
            relations: ['loanProposals', 'borrower', 'loanProposals.lender'],
            // join: {
            //     alias: 'LoanRequest',
            //     leftJoinAndSelect: {
            //         "loanProposals": "LoanRequest.loanProposals",
            //         "lender": "loanProposals.lender"
            //     }

            // }
        })
        foundRequests.forEach((request) => console.log(request.loanProposals))
        return foundRequests;
    }

    async getForeignRequests(loggedUser: User): Promise<LoanRequest[]> {
        let foundRequests: LoanRequest[] = await this.loanRequestRepo.find({
            where: {borrower: { id: Not(loggedUser.id)}}, relations: ['loanProposals', 'borrower',]
        })
        return foundRequests;
    }
}