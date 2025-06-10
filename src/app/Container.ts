import { CreateTransaction } from "../application/useCases/Transaction/CreateTransaction"
import { DeleteTransaction } from "../application/useCases/Transaction/DeleteTransaction";
import { TransactionController } from "../infrastructure/web/express/controllers/TransactionController";
import { PrismaTransactionRepository } from "../infrastructure/db/prisma/PrismaTransactionRepository";

export class Container {
    public get transactionController(){
        const TransactionRepository = new PrismaTransactionRepository();
        const createTransaction = new CreateTransaction(TransactionRepository);
        const deleteTransaction = new DeleteTransaction(TransactionRepository); // Assuming you have a DeleteTransaction use case
        const transactionController = new TransactionController(createTransaction, deleteTransaction);
        return transactionController;
    }
}