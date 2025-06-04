import { CreateTransaction } from "../application/useCases/Transaction/CreateTransaction"
import { TransactionController } from "../infrastructure/web/express/controllers/TransactionController";
import { PrismaTransactionRepository } from "../infrastructure/db/prisma/PrismaTransactionRepository";

export class Container {
    public get transactionController(){
        const TransactionRepository = new PrismaTransactionRepository();
        const createTransaction = new CreateTransaction(TransactionRepository);
        const transactionController = new TransactionController(createTransaction);
        return transactionController;
    }
}