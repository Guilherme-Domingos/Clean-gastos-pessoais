import { MonthlyGoal } from "../../../domain/entities/MonthlyGoal";
import { MonthlyGoalRepository } from "../../../domain/repositories/MonthlyGoalRepository";
import { CreateMonthlyGoalInputDTO } from "../../dto/monthlyGoal/CreateMonthlyGoalInputDTO";
import { CreateMonthlyGoalOutputDTO } from "../../dto/monthlyGoal/CreateMonthlyGoalOutputDTO";
import { UseCase } from "../UseCase";

export class CreateMonthlyGoal implements UseCase<CreateMonthlyGoalInputDTO, CreateMonthlyGoalOutputDTO> {
    constructor(private readonly monthlyGoalRepository: MonthlyGoalRepository) {}    
      public async execute(inputDto: CreateMonthlyGoalInputDTO): Promise<CreateMonthlyGoalOutputDTO> {
        const monthlyGoal = MonthlyGoal.create(
            inputDto.userId,
            inputDto.valorLimite,
            inputDto.mes,
            inputDto.ano
        );
        
        await this.monthlyGoalRepository.save(monthlyGoal);

        const outputDTO: CreateMonthlyGoalOutputDTO = {id: monthlyGoal.id};
        return outputDTO;
    }
}