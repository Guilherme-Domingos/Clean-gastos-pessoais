import { MonthlyGoal } from '../../../domain/entities/MonthlyGoal';
import { MonthlyGoalRepository } from '../../../domain/repositories/MonthlyGoalRepository';
import { UpdateMonthlyGoalInputDTO } from '../../dto/monthlyGoal/UpdateMonthlyGoalInputDTO';
import { UpdateMonthlyGoalOutputDTO } from '../../dto/monthlyGoal/UpdateMonthlyGoalOutputDTO';
import { UseCase } from '../UseCase';

export class UpdateMonthlyGoal implements UseCase<UpdateMonthlyGoalInputDTO, UpdateMonthlyGoalOutputDTO> {
    constructor(private monthlyGoalRepository: MonthlyGoalRepository) {}

    async execute(input: UpdateMonthlyGoalInputDTO): Promise<UpdateMonthlyGoalOutputDTO> {
        try {
            const existingMonthlyGoal = await this.monthlyGoalRepository.findById(input.id);
            
            if (!existingMonthlyGoal) {
                return {
                    id: input.id,
                    success: false,
                    message: 'MonthlyGoal not found'
                };
            }
            
            // Obter os dados atuais da categoria
            const currentProps = existingMonthlyGoal.toPersistentData();
            
            // Criar uma nova categoria com os dados atualizados
            const updatedMonthlyGoal = MonthlyGoal.fromPersistentData({
                id: currentProps.id,
                valorLimite: input.valorLimite ?? currentProps.valorLimite,
                mes: input.mes ?? currentProps.mes,
                ano: input.ano ?? currentProps.ano,
                userId: input.userId ?? currentProps.userId,
            });
            
            await this.monthlyGoalRepository.update(updatedMonthlyGoal);
            
            return {
                id: updatedMonthlyGoal.id,
                success: true,
                message: 'MonthlyGoal updated successfully'
            };
        } catch (error) {
            console.error('Error updating MonthlyGoal:', error);
            return {
                id: input.id,
                success: false,
                message: 'Failed to update MonthlyGoal'
            };
        }
    }
}
