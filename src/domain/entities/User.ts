export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
    };

export class User {
    private constructor(
        private props: UserProps,
    ){}

    public static create(id: string, name: string, email: string, password: string): User {
        if (!name || name.length < 3) {
            throw new Error('O nome deve ter pelo menos 3 caracteres');
        }
        if (!email || !email.includes('@')) {
            throw new Error('Email inválido');
        }
        return new User({ id: crypto.randomUUID.toString(), name, email, password });
    }

    get id(): string {
        return this.props.id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }
}