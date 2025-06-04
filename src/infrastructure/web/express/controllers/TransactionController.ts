import { Request, Response } from 'express';
import { CreateTransaction } from '../../../../application/useCases/Transaction/CreateTransaction';

export class TransactionController {
    constructor(private createTransaction: CreateTransaction) {}

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
}   