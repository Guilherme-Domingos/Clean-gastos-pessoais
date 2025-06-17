import { Request, Response } from 'express';
import { CreateMonthlyGoal } from '../../../../application/useCases/MonthlyGoal/CreateMonthlyGoal';

export class MonthlyGoalController {
    constructor(private createMonthlyGoal: CreateMonthlyGoal) {}

    public async handleCreateMonthlyGoal(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, valorLimite, mes, ano } = req.body;

            const monthlyGoal = await this.createMonthlyGoal.execute({
                userId,
                valorLimite,
                mes,
                ano
            });

            return res.status(201).json({ data: monthlyGoal.id, message: 'Monthly goal created successfully' });
        } catch (error) {
            console.error('Error creating monthly goal:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}