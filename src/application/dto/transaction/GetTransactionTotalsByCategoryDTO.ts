export type GetTransactionTotalsByCategoryInputDTO = {
    userId: string;
    type: 'RECEITA' | 'DESPESA';
};

export type GetTransactionTotalsByCategoryOutputDTO = {
    totals: {
        categoryId: number;
        categoryName: string;
        total: number;
    }[];
};
