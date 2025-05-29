export type MonthlyGoalProps = {
    id: string;
    valorLimite: number;
    mes: number;
    ano: number;
    userId: string;
}

export class MonthlyGoal {
    private constructor(
            private props: MonthlyGoalProps,
    ){}

    public static create(id: string, userId: string, valorLimite: number, mes: number, ano: number): MonthlyGoal {
        return new MonthlyGoal({ id: crypto.randomUUID(), userId, valorLimite, mes, ano });
    }

    public static fromPersistentData(props: MonthlyGoalProps): MonthlyGoal {
        return new MonthlyGoal(props);
    }
    
    public toPersistentData(): MonthlyGoalProps {
        return this.props;
    }

    get id(): string {
        return this.props.id;
    }
    get userId(): string {
        return this.props.userId;
    }
    get valorLimite(): number {
        return this.props.valorLimite;
    }
    get mes(): number {
        return this.props.mes;
    }
    get ano(): number {
        return this.props.ano;
    }
}