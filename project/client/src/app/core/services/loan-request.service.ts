import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { LoanRequestDTO } from 'src/app/features/borrower-screen/models/loan-request.dto';
import { CONFIG } from './../../config/config';
import { CreateLoanRequestDTO } from 'src/app/features/borrower-screen/models/create-loan-request.dto';
import { UserDTO } from 'src/app/features/users/models/user.dto';
import { CreateUserDTO } from 'src/app/features/users/models/create-user.dto';

@Injectable({
    providedIn: 'root'
})
export class LoanRequestService {

    constructor(
        private readonly http: HttpClient
    ) { }
    private subject = new Subject<LoanRequestDTO>();

    private currentRequestSubject = new Subject<LoanRequestDTO>();


    getAllExistingRequests(): Observable<LoanRequestDTO[]> {
        return this.http.get<LoanRequestDTO[]>(`${CONFIG.MAIN_URL}/loan-requests/get-all-existing-requests`)
    }

    getMyRequests(): Observable<LoanRequestDTO[]> {
        return this.http.get<LoanRequestDTO[]>(`${CONFIG.MAIN_URL}/loan-requests/get-my-requests`)
    }

    getForeignRequests(): Observable<LoanRequestDTO[]> {
        return this.http.get<LoanRequestDTO[]>(`${CONFIG.MAIN_URL}/loan-requests/get-foreign-requests`,)
    }

    createRequest(request: CreateLoanRequestDTO): Observable<LoanRequestDTO> {
        return this.http.post<LoanRequestDTO>(`${CONFIG.MAIN_URL}/loan-requests/create-request`, request)
    }


    setCreatedRequest(request: LoanRequestDTO) {
        this.subject.next(request)
    }

    getCreatedRequest(): Observable<LoanRequestDTO> {
        return this.subject.asObservable();
    }

    setCurrentRequest(request: LoanRequestDTO) {
        this.currentRequestSubject.next(request)
    }

    getCurrentRequest(): Observable<LoanRequestDTO> {
        return this.currentRequestSubject.asObservable();
    }

}

