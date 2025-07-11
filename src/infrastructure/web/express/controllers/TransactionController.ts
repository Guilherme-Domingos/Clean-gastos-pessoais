import { Request, Response } from 'express';
import { CreateTransaction } from '../../../../application/useCases/Transaction/CreateTransaction';
import { DeleteTransaction } from '../../../../application/useCases/Transaction/DeleteTransaction';
import { FindTransaction } from '../../../../application/useCases/Transaction/FindTransaction';
import { FindUserTransactions } from '../../../../application/useCases/Transaction/FindUserTransactions';
import { FindUserTransactionsByMonth } from '../../../../application/useCases/Transaction/FindUserTransactionsByMonth';
import { GetTransactionTotalsByCategory } from '../../../../application/useCases/Transaction/GetTransactionTotalsByCategory';
import { ListTransactions } from '../../../../application/useCases/Transaction/ListTransactions';
import { UpdateTransaction } from '../../../../application/useCases/Transaction/UpdateTransaction';

export class TransactionController {
    constructor(
        private createTransaction: CreateTransaction, 
        private deleteTransaction: DeleteTransaction,
        private listTransactions: ListTransactions,
        private updateTransaction: UpdateTransaction,
        private findTransaction: FindTransaction,
        private findUserTransactions: FindUserTransactions,
        private findUserTransactionsByMonth: FindUserTransactionsByMonth,
        private getTransactionTotalsByCategory: GetTransactionTotalsByCategory
    ) {}

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
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async handleListTransactions(res: Response){
        try {
            const transactions = await this.listTransactions.execute();
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async handleUpdateTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const { date, amount, description, type, sender, userId, categoryId } = req.body;

            const result = await this.updateTransaction.execute({
                id,
                date,
                amount,
                description,
                type,
                sender,
                userId,
                categoryId
            });

            if (!result.success) {
                return res.status(404).json({ error: result.message });
            }

            return res.status(200).json({ data: result, message: result.message });
        } catch (error) {
            console.error('Error updating transaction:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleFindTransaction(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            const result = await this.findTransaction.execute({ id });
            
            if (!result) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error finding transaction:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleFindUserTransactions(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.userId;
            const result = await this.findUserTransactions.execute({ userId });
            
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error finding user transactions:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleFindUserTransactionsByMonth(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.userId;
            const month = parseInt(req.params.month);
            const year = parseInt(req.params.year);
            
            // Validação básica dos parâmetros
            if (isNaN(month) || month < 1 || month > 12) {
                return res.status(400).json({ error: 'Mês inválido. Deve estar entre 1 e 12.' });
            }
            
            if (isNaN(year) || year < 2000 || year > 2100) {
                return res.status(400).json({ error: 'Ano inválido.' });
            }
            
            const result = await this.findUserTransactionsByMonth.execute({ userId, month, year });
            
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error finding user transactions by month:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async handleGetTransactionTotalsByCategory(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.userId;
            const type = req.query.type as 'RECEITA' | 'DESPESA';

            // Validar parâmetros
            if (!userId) {
                return res.status(400).json({ error: 'ID do usuário é obrigatório.' });
            }

            if (!type || (type !== 'RECEITA' && type !== 'DESPESA')) {
                return res.status(400).json({ error: 'Tipo de transação inválido. Deve ser RECEITA ou DESPESA.' });
            }
            
            const result = await this.getTransactionTotalsByCategory.execute({ userId, type });
            
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error getting transaction totals by category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}