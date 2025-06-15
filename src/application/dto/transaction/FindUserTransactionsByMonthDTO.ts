export type FindUserTransactionsByMonthInputDTO = {
    userId: string;
    month: number;
    year: number;
}

export type FindUserTransactionsByMonthOutputDTO = {
    transactions: {
        id: string;
        amount: number;
        description: string;
        date: Date;
        categoryId?: number;
        categoryName?: string;
        transactionType: 'RECEITA' | 'DESPESA';
        sender?: string;
        userId: string;
    }[],
    summary: {
        totalRevenue: number;
        totalExpense: number;
        balance: number;
    }
};
