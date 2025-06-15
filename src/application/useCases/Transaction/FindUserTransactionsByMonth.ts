import { Transaction } from "../../../domain/entities/Transaction";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { FindUserTransactionsByMonthInputDTO, FindUserTransactionsByMonthOutputDTO } from "../../dto/transaction/FindUserTransactionsByMonthDTO";
import { UseCase } from "../UseCase";

export class FindUserTransactionsByMonth implements UseCase<FindUserTransactionsByMonthInputDTO, FindUserTransactionsByMonthOutputDTO> {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    public async execute(inputDto: FindUserTransactionsByMonthInputDTO): Promise<FindUserTransactionsByMonthOutputDTO> {
        const transactions = await this.transactionRepository.findByUserIdAndMonth(
            inputDto.userId, 
            inputDto.month, 
            inputDto.year
        );
        
        const transactionsList = this.mapTransactionsToOutput(transactions);
        
        // Calcular totais para o resumo
        let totalRevenue = 0;
        let totalExpense = 0;
        
        // Calcular receitas e despesas
        transactionsList.forEach(transaction => {
            if (transaction.transactionType === 'RECEITA') {
                totalRevenue += transaction.amount;
            } else {
                totalExpense += transaction.amount;
            }
        });
        
        // Calcular o saldo (receitas - despesas)
        const balance = totalRevenue - totalExpense;
        
        return {
            transactions: transactionsList,
            summary: {
                totalRevenue,
                totalExpense,
                balance
            }
        };
    }

    private mapTransactionsToOutput(transactions: Transaction[]): FindUserTransactionsByMonthOutputDTO["transactions"] {
        return transactions.map((transaction) => {
            return {
                id: transaction.id,
                date: transaction.date,
                amount: transaction.amount,
                description: transaction.description || "",
                transactionType: transaction.type,
                sender: transaction.sender,
                categoryId: transaction.categoryId,
                userId: transaction.userId
            };
        });
    }
}
