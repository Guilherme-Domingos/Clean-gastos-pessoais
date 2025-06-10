import { CreateTransaction } from "../application/useCases/Transaction/CreateTransaction"
import { DeleteTransaction } from "../application/useCases/Transaction/DeleteTransaction";
import { FindTransaction } from "../application/useCases/Transaction/FindTransaction";
import { ListTransactions } from "../application/useCases/Transaction/ListTransactions";
import { UpdateTransaction } from "../application/useCases/Transaction/UpdateTransaction";
import { TransactionController } from "../infrastructure/web/express/controllers/TransactionController";
import { PrismaTransactionRepository } from "../infrastructure/db/prisma/PrismaTransactionRepository";

export class Container {
    public get transactionController(){
        const TransactionRepository = new PrismaTransactionRepository();
        const createTransaction = new CreateTransaction(TransactionRepository);
        const deleteTransaction = new DeleteTransaction(TransactionRepository);
        const listTransactions = new ListTransactions(TransactionRepository);
        const updateTransaction = new UpdateTransaction(TransactionRepository);
        const findTransaction = new FindTransaction(TransactionRepository);
        const transactionController = new TransactionController(
            createTransaction, 
            deleteTransaction, 
            listTransactions, 
            updateTransaction,
            findTransaction
        );
        return transactionController;
    }
}