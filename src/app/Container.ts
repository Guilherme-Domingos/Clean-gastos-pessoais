import { CreateTransaction } from "../application/useCases/Transaction/CreateTransaction"
import { DeleteTransaction } from "../application/useCases/Transaction/DeleteTransaction";
import { ListTransactions } from "../application/useCases/Transaction/ListTransactions";
import { TransactionController } from "../infrastructure/web/express/controllers/TransactionController";
import { PrismaTransactionRepository } from "../infrastructure/db/prisma/PrismaTransactionRepository";

export class Container {
    public get transactionController(){
        const TransactionRepository = new PrismaTransactionRepository();
        const createTransaction = new CreateTransaction(TransactionRepository);
        const deleteTransaction = new DeleteTransaction(TransactionRepository);
        const listTransactions = new ListTransactions(TransactionRepository);
        const transactionController = new TransactionController(createTransaction, deleteTransaction, listTransactions);
        return transactionController;
    }
}