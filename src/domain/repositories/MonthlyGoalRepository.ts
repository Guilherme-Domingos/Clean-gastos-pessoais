import { MonthlyGoal } from "../entities/MonthlyGoal";

export interface MonthlyGoalRepository {
    findById(id: number): Promise<MonthlyGoal | null>;
    findByUserId(userId: string): Promise<MonthlyGoal[]>;
    save(monthlyGoal: MonthlyGoal): Promise<void>;
    update(monthlyGoal: MonthlyGoal): Promise<void>;
    delete(id: number): Promise<void>;
    findAll(): Promise<MonthlyGoal[]>;
}