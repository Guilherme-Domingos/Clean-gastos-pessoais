export type FindUserMonthlyGoalInputDTO = {
    userId: string;
}
export type FindUserMonthlyGoalOutputDTO = {
    monthlyGoals: {
    id: number;
    valorLimite: number;
    mes: number;
    ano: number;
    }[]
};