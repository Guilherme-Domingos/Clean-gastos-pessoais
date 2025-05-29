export type ListTransactionInputDTO = void;
export type ListTransactionOutputDTO = {
    transactions: {
        id: string;
        amount: number;
        description: string;
        date: Date;
        categoryId: string;
        transactionType: 'income' | 'expense';
    }[]
};