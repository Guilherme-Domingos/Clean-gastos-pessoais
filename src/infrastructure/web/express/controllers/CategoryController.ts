import { Request, Response } from "express";
import { CreateCategory } from "../../../../application/useCases/Category/CreateCategory";

export class CategoryController {
    constructor(
        private createCategory: CreateCategory
    ) {}

    public async handleCreateCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { name, userId } = req.body;

            const category = await this.createCategory.execute({
                name, 
                userId
            });

            return res.status(201).json({data: category.id, message: 'Category created successfully'});
        } catch (error) {
            console.error('Error creating category:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}