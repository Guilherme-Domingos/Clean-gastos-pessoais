import { PrismaClient } from "@prisma/client";
import { MonthlyGoal, MonthlyGoalProps } from "../../../domain/entities/MonthlyGoal";
import { MonthlyGoalRepository } from "../../../domain/repositories/MonthlyGoalRepository";

const prisma = new PrismaClient();

export class PrismaMonthlyGoalRepository implements MonthlyGoalRepository {
    
    async findById(id: number): Promise<MonthlyGoal | null> {
        const monthlyGoal = await prisma.metaMensal.findUnique({
            where: { id },
        });
        
        return monthlyGoal 
            ? MonthlyGoal.fromPersistentData({ 
                id: monthlyGoal.id,
                valorLimite: Number(monthlyGoal.valorLimite),
                mes: monthlyGoal.mes,
                ano: monthlyGoal.ano,
                userId: monthlyGoal.usuarioId 
            }) 
            : null;
    }

    async findByUserId(userId: string): Promise<MonthlyGoal[]> {
        const monthlyGoals = await prisma.metaMensal.findMany({
            where: { usuarioId: userId },
        });
        
        return monthlyGoals.map(monthlyGoal => 
            MonthlyGoal.fromPersistentData({ 
                id: monthlyGoal.id, 
                valorLimite: Number(monthlyGoal.valorLimite), 
                mes: monthlyGoal.mes, 
                ano: monthlyGoal.ano,
                userId: monthlyGoal.usuarioId 
            })
        );
    }

    async save(monthlyGoal: MonthlyGoal): Promise<void> {
        const savedMonthlyGoal = await prisma.metaMensal.create({
            data: {
                valorLimite: monthlyGoal.valorLimite,
                mes: monthlyGoal.mes,
                ano: monthlyGoal.ano,
                usuarioId: monthlyGoal.userId,
            }
        });
        
        // Atualizando o ID gerado na entidade MonthlyGoal usando o método adequado
        monthlyGoal.updateId(savedMonthlyGoal.id);
    }

    async update(monthlyGoal: MonthlyGoal): Promise<void> {
        await prisma.metaMensal.update({
            where: { id: monthlyGoal.id },
            data: {
                valorLimite: monthlyGoal.valorLimite,
                mes: monthlyGoal.mes,
                ano: monthlyGoal.ano,
            },
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.metaMensal.delete({
            where: { id },
        });
    }

    async findAll(): Promise<MonthlyGoal[]> {
        const monthlyGoals = await prisma.metaMensal.findMany();
        
        return monthlyGoals.map(monthlyGoal => 
            MonthlyGoal.fromPersistentData({ 
                id: monthlyGoal.id, 
                valorLimite: Number(monthlyGoal.valorLimite), 
                mes: monthlyGoal.mes, 
                ano: monthlyGoal.ano,
                userId: monthlyGoal.usuarioId 
            })
        );
    }
}