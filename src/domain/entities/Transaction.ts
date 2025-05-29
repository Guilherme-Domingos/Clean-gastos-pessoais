export type TransactionProps = {
    id: string;
    date: Date;
    amount: number;
    description?: string;
    type: 'RECEITA' | 'DESPESA';
    sender?: string;
    category: string;
}

export class Transaction {
    private constructor(
            private props: TransactionProps,
    ){}

    public static create( date: Date, amount: number, description: string | undefined, type: 'RECEITA' | 'DESPESA', sender: string | undefined, category: string): Transaction {
        return new Transaction({ id: crypto.randomUUID(), date, amount, description, type, sender, category });
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

    get date(): Date {
        return this.props.date;
    }

    get amount(): number {
        return this.props.amount;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    get type(): 'RECEITA' | 'DESPESA' {
        return this.props.type;
    }

    get sender(): string | undefined {
        return this.props.sender;
    }

    get category(): string {
        return this.props.category;
    }
}