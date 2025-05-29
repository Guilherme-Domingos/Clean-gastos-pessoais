// import { PrismaClient } from "@prisma/client";
// import { Transaction, TransactionProps } from "../../../domain/entities/Transaction";
// import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";

// const prisma = new PrismaClient();

// export class PrismaTransactionRepository implements TransactionRepository {
//     async findById(id: string): Promise<Transaction | null> {
//         const transaction = await prisma.transaction.findUnique({
//             where: { id },
//         });
//         return transaction ? Transaction.fromPrisma(transaction) : null;
//     }

//     async findByUserId(userId: string): Promise<Transaction[]> {
//         const transactions = await prisma.transaction.findMany({
//             where: { userId },
//         });
//         return transactions.map(Transaction.fromPrisma);
//     }

//     async save(transaction: Transaction): Promise<void> {
//         await prisma.transacao.create({
//             data: {
//                 id: transaction.id,
//                 data: transaction.date,
//                 valor: transaction.amount,
//                 descricao: transaction.description,
//                 tipo: transaction.type,
//                 remetente: transaction.sender,
//                 categoria: transaction.category,
//             }
//         });
        
//     }

//     async update(transaction: Transaction): Promise<void> {
//         await prisma.transaction.update({
//             where: { id: transaction.id },
//             data: transaction.toPrisma(),
//         });
//     }

//     async delete(id: string): Promise<void> {
//         await prisma.transaction.delete({
//             where: { id },
//         });
//     }

//     async findAll(): Promise<Transaction[]> {
//         const transactions = await prisma.transaction.findMany();
//         return transactions.map(Transaction.fromPrisma);
//     }
// }