// Importações necessárias da entidade transação
import { CreateTransaction } from "../application/useCases/Transaction/CreateTransaction"
import { DeleteTransaction } from "../application/useCases/Transaction/DeleteTransaction";
import { FindTransaction } from "../application/useCases/Transaction/FindTransaction";
import { FindUserTransactions } from "../application/useCases/Transaction/FindUserTransactions";
import { ListTransactions } from "../application/useCases/Transaction/ListTransactions";
import { UpdateTransaction } from "../application/useCases/Transaction/UpdateTransaction";
import { TransactionController } from "../infrastructure/web/express/controllers/TransactionController";
import { PrismaTransactionRepository } from "../infrastructure/db/prisma/PrismaTransactionRepository";

// Importações necessárias da entidade usuário
import { UserController } from "../infrastructure/web/express/controllers/UserController";
import { PrismaUserRepository } from "../infrastructure/db/prisma/PrismaUserRepository";
import { CreateUser } from "../application/useCases/User/CreateUser";
import { ListUsers } from "../application/useCases/User/ListUsers";
import { DeleteUser } from "../application/useCases/User/DeleteUser";

export class Container {
    public get transactionController(){
        const TransactionRepository = new PrismaTransactionRepository();
        const createTransaction = new CreateTransaction(TransactionRepository);
        const deleteTransaction = new DeleteTransaction(TransactionRepository);
        const listTransactions = new ListTransactions(TransactionRepository);
        const updateTransaction = new UpdateTransaction(TransactionRepository);
        const findTransaction = new FindTransaction(TransactionRepository);
        const findUserTransactions = new FindUserTransactions(TransactionRepository);
        const transactionController = new TransactionController(
            createTransaction, 
            deleteTransaction, 
            listTransactions, 
            updateTransaction,
            findTransaction,
            findUserTransactions
        );
        return transactionController;
    }    public get userController() {
        const userRepository = new PrismaUserRepository();
        const createUser = new CreateUser(userRepository);
        const listUsers = new ListUsers(userRepository);
        const deleteUser = new DeleteUser(userRepository);
        const userController = new UserController(createUser, listUsers, deleteUser);
        return userController;
    }
}