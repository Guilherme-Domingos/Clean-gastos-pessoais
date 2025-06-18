import { MonthlyGoal } from "../../../domain/entities/MonthlyGoal";
import { MonthlyGoalRepository } from "../../../domain/repositories/MonthlyGoalRepository";
import { FindUserMonthlyGoalInputDTO, FindUserMonthlyGoalOutputDTO } from "../../dto/monthlyGoal/FindUserMonthlyGoalDTO";
import { UseCase } from "../UseCase";

export class FindUserMonthlyGoal implements UseCase<FindUserMonthlyGoalInputDTO, FindUserMonthlyGoalOutputDTO> {
    constructor(private readonly monthlyGoalRepository: MonthlyGoalRepository) {}

    public async execute(inputDto: FindUserMonthlyGoalInputDTO): Promise<FindUserMonthlyGoalOutputDTO> {
        const monthlyGoals = await this.monthlyGoalRepository.findByUserId(inputDto.userId);
        
        return {
            monthlyGoals: this.mapCategoriesToOutput(monthlyGoals)
        };
    }

    private mapCategoriesToOutput(monthlyGoals: MonthlyGoal[]): FindUserMonthlyGoalOutputDTO["monthlyGoals"] {
        return monthlyGoals.map((monthlyGoal) => {
            return {
                id: monthlyGoal.id,
                valorLimite: monthlyGoal.valorLimite,
                mes: monthlyGoal.mes,
                ano: monthlyGoal.ano
            };
        });
    }
}
