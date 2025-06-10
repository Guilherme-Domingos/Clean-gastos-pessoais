import { Request, Response } from 'express';
import { CreateTransaction } from '../../../../application/useCases/Transaction/CreateTransaction';
import { DeleteTransaction } from '../../../../application/useCases/Transaction/DeleteTransaction';

export class TransactionController {
    constructor(private createTransaction: CreateTransaction, private deleteTransaction: DeleteTransaction) {}

    public async handleCreateTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const { date, amount, description, type, sender, userId, categoryId } = req.body;

            const transaction = await this.createTransaction.execute({
                date, 
                amount, 
                description, 
                type, 
                sender, 
                userId, 
                categoryId
            });

            return res.status(201).json({data: transaction.id, message: 'Transaction created successfully'});
        } catch (error) {
            console.error('Error creating transaction:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleDeleteTransaction(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await this.deleteTransaction.execute({ id });
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}   