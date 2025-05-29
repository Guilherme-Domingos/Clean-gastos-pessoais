export type CategoryProps = {
    id: string;
    name: string;
    userId: string;
}

export class Category {
    private constructor(
            private props: CategoryProps,
    ){}
    
    public static create(id: string, userId: string, name: string): Category {
        return new Category({ id: crypto.randomUUID(), userId, name });
    }

    public static fromPersistentData(props: CategoryProps): Category {
        return new Category(props);
    }
    
    public toPersistentData(): CategoryProps {
        return this.props;
    }

    get id(): string {
        return this.props.id;
    }
    get name(): string {
        return this.props.name;
    }
    get userId(): string {
        return this.props.userId;
    }
}