export type CreateTransactionInputDTO = {
    amount: number;
    description: string;
    date: Date;
    category: string;
    type: 'RECEITA' | 'DESPESA';
    sender?: string;
};