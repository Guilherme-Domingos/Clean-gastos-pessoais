import { CategoryTotalType, TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { GetTransactionTotalsByCategoryInputDTO, GetTransactionTotalsByCategoryOutputDTO } from "../../dto/transaction/GetTransactionTotalsByCategoryDTO";
import { UseCase } from "../UseCase";

export class GetTransactionTotalsByCategory implements UseCase<GetTransactionTotalsByCategoryInputDTO, GetTransactionTotalsByCategoryOutputDTO> {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    public async execute(inputDto: GetTransactionTotalsByCategoryInputDTO): Promise<GetTransactionTotalsByCategoryOutputDTO> {
        const totals = await this.transactionRepository.getTotalByCategory(
            inputDto.userId, 
            inputDto.type
        );
        
        return {
            totals
        };
    }
}
