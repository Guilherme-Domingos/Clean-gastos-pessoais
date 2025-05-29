export type TransactionProps = {
    id: string;
    userId: string;
    date: Date;
    value: number;
    description?: string;
    type: 'receita' | 'despesa';
    sender?: string;
    category: string;
}

export class Transaction {
    private constructor(
            private props: TransactionProps,
    ){}

    public static create(id: string, userId: string, date: Date, value: number, description: string, type: 'receita' | 'despesa', sender: string, category: string): Transaction {
        return new Transaction({ id: crypto.randomUUID(), userId, date, value, description, type, sender, category });
    }

    public static fromPersistentData(props: TransactionProps): Transaction {
        return new Transaction(props);
    }
    
    public toPersistentData(): TransactionProps {
        return this.props;
    }

    get id(): string {
        return this.props.id;
    }

    get userId(): string {
        return this.props.userId;
    }

    get date(): Date {
        return this.props.date;
    }

    get value(): number {
        return this.props.value;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    get type(): 'receita' | 'despesa' {
        return this.props.type;
    }

    get sender(): string | undefined {
        return this.props.sender;
    }

    get category(): string {
        return this.props.category;
    }
}