import {  Transaction } from '../entities/Transaction';

export type CategoryTotalType = {
    categoryId: number;
    categoryName: string;
    total: number;
};

export interface TransactionRepository {
    findById(id: string): Promise<Transaction | null>;
    findByUserId(userId: string): Promise<Transaction[]>;
    findByUserIdAndMonth(userId: string, month: number, year: number): Promise<Transaction[]>;
    getTotalByCategory(userId: string, type: 'RECEITA' | 'DESPESA'): Promise<CategoryTotalType[]>;
    save(transaction: Transaction): Promise<void>;
    update(transaction: Transaction): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Transaction[]>;
}