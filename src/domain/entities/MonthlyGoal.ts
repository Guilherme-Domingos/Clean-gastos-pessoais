export type MonthlyGoalProps = {
    id: number;
    valorLimite: number;
    mes: number;
    ano: number;
    userId: string;
}

export class MonthlyGoal {
    private constructor(
            private props: MonthlyGoalProps,
    ){}    
    
    public static create(userId: string, valorLimite: number, mes: number, ano: number): 
    MonthlyGoal {
        if (valorLimite <= 0) {
            throw new Error('O valor limite deve ser maior que zero.');
        }
        if (mes < 1 || mes > 12) {
            throw new Error('O mês deve estar entre 1 e 12.');
        }
        if (mes < new Date().getMonth()){
            throw new Error('O mês não pode ser anterior ao mês atual.');
        }
        if (ano < new Date().getFullYear() || ano > new Date().getFullYear() + 1) {
            throw new Error('O ano deve ser um valor válido.');
        }

        return new MonthlyGoal({ id: 0, userId, valorLimite, mes, ano });
    }

    public static fromPersistentData(props: MonthlyGoalProps): MonthlyGoal {
        return new MonthlyGoal(props);
    }
    
    public toPersistentData(): MonthlyGoalProps {
        return this.props;
    }    
    
    // Método para atualizar o ID após salvar no banco de dados
    public updateId(newId: number): void {
        this.props.id = newId;
    }
    
    get id(): number {
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