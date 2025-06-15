export type CategoryProps = {
    id: number;
    name: string;
    userId: string;
}

export class Category {
    private constructor(
            private props: CategoryProps,
    ){}
      public static create(userId: string, name: string): Category {
        return new Category({ id: 0, userId, name });
    }

    public static fromPersistentData(props: CategoryProps): Category {
        return new Category(props);
    }
    
    public toPersistentData(): CategoryProps {
        return this.props;
    }    
    
    // Método para atualizar o ID após salvar no banco de dados
    public updateId(newId: number): void {
        this.props.id = newId;
    }
    
    get id(): number {
        return this.props.id;
    }
    get name(): string {
        return this.props.name;
    }
    get userId(): string {
        return this.props.userId;
    }
}