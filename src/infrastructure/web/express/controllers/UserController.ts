import { Request, Response } from 'express';
import { CreateUser } from '../../../../application/useCases/User/CreateUser';

export class UserController {
    constructor(
        private createUser: CreateUser
    ) {}

    public async handleCreateUser(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            const user = await this.createUser.execute({
                name,
                email,
                password
            });

            return res.status(201).json({ data: user.id, message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}