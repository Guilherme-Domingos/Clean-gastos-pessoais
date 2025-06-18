import { PrismaClient } from "@prisma/client";
import { Transaction, TransactionProps } from "../../../domain/entities/Transaction";
import { CategoryTotalType, TransactionRepository } from "../../../domain/repositories/TransactionRepository";

const prisma = new PrismaClient();

export class PrismaTransactionRepository implements TransactionRepository {
    async findById(id: string): Promise<Transaction | null> {
        const transaction = await prisma.transacao.findUnique({
            where: { id },
            include: {
                categoria: true
            }
        });
        if (!transaction) return null;
        
        return Transaction.fromPersistentData({
            id: transaction.id,
            date: transaction.data,
            amount: Number(transaction.valor),
            description: transaction.descricao ?? undefined,
            type: transaction.tipo,
            sender: transaction.remetente ?? undefined,
            userId: transaction.usuarioId,
            categoryId: transaction.categoriaId ?? undefined
        });
    }

    async findByUserId(userId: string): Promise<Transaction[]> {
        const transactions = await prisma.transacao.findMany({
            where: { usuarioId: userId },
            include: {
                categoria: true
            }
        });
        
        return transactions.map(transaction => Transaction.fromPersistentData({
            id: transaction.id,
            date: transaction.data,
            amount: Number(transaction.valor),
            description: transaction.descricao ?? undefined,
            type: transaction.tipo,
            sender: transaction.remetente ?? undefined,
            userId: transaction.usuarioId,
            categoryId: transaction.categoriaId ?? undefined
        }));
    }

    async findByUserIdAndMonth(userId: string, month: number, year: number): Promise<Transaction[]> {
        // Criar a data de início (primeiro dia do mês)
        const startDate = new Date(year, month - 1, 1);
        
        // Criar a data de fim (primeiro dia do próximo mês)
        const endDate = new Date(year, month, 0);
        
        const transactions = await prisma.transacao.findMany({
            where: { 
                usuarioId: userId,
                data: {
                    gte: startDate,
                    lte: endDate,
                }
            },
            include: {
                categoria: true
            },
            orderBy: {
                data: 'desc' // Ordena por data, mais recentes primeiro
            }
        });
        
        return transactions.map(transaction => Transaction.fromPersistentData({
            id: transaction.id,
            date: transaction.data,
            amount: Number(transaction.valor),
            description: transaction.descricao ?? undefined,
            type: transaction.tipo,
            sender: transaction.remetente ?? undefined,
            userId: transaction.usuarioId,
            categoryId: transaction.categoriaId ?? undefined
        }));
    }

    async save(transaction: Transaction): Promise<void> {
        await prisma.transacao.create({
            data: {
                id: transaction.id,
                data: transaction.date,
                valor: transaction.amount,
                descricao: transaction.description,
                tipo: transaction.type,
                remetente: transaction.sender,
                usuarioId: transaction.userId,
                categoriaId: transaction.categoryId,
            }
        });
    }

    async update(transaction: Transaction): Promise<void> {
        await prisma.transacao.update({
            where: { id: transaction.id },
            data: {
                data: transaction.date,
                valor: transaction.amount,
                descricao: transaction.description,
                tipo: transaction.type,
                remetente: transaction.sender,
                categoriaId: transaction.categoryId,
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.transacao.delete({
            where: { id }
        });
    }

    async findAll(): Promise<Transaction[]> {
        const transactions = await prisma.transacao.findMany({
            include: {
                categoria: true
            }
        });
        
        return transactions.map(transaction => Transaction.fromPersistentData({
            id: transaction.id,
            date: transaction.data,
            amount: Number(transaction.valor),            description: transaction.descricao ?? undefined,
            type: transaction.tipo,
            sender: transaction.remetente ?? undefined,
            userId: transaction.usuarioId,
            categoryId: transaction.categoriaId ?? undefined
        }));
    }

    async getTotalByCategory(userId: string, type: 'RECEITA' | 'DESPESA'): Promise<CategoryTotalType[]> {
        // Primeiro, precisamos buscar todas as transações do usuário com o tipo especificado que possuem categoria
        const transactions = await prisma.transacao.findMany({
            where: { 
                usuarioId: userId, 
                tipo: type,
                categoriaId: {
                    not: null
                } 
            },
            include: {
                categoria: true
            }
        });

        // Agora vamos agrupar por categoria e somar os valores
        const categoryTotals = new Map<number, CategoryTotalType>();

        for (const transaction of transactions) {
            if (!transaction.categoriaId || !transaction.categoria) continue;
            
            const categoryId = transaction.categoriaId;
            const amount = Number(transaction.valor);
            
            if (categoryTotals.has(categoryId)) {
                const current = categoryTotals.get(categoryId)!;
                categoryTotals.set(categoryId, {
                    ...current,
                    total: current.total + amount
                });
            } else {
                categoryTotals.set(categoryId, {
                    categoryId: categoryId,
                    categoryName: transaction.categoria.nome,
                    total: amount
                });
            }
        }

        // Converter o Map para um array e ordenar por total (decrescente)
        return Array.from(categoryTotals.values())
            .sort((a, b) => b.total - a.total);
    }
}