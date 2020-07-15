export class ActiveLoanDTO {
  id: number;

  lenderId: string;

  borrowerId: string;

  amount: number;

  period: number;

  interestRate: number;

  totalInterestAdded: number;

  penaltyRate: number;

  totalPenaltyAdded: number;

  isDeleted: boolean;
}
