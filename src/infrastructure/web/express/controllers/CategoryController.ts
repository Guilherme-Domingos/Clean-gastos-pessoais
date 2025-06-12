import { Request, Response } from "express";
import { CreateCategory } from "../../../../application/useCases/Category/CreateCategory";
import { ListCategories } from "../../../../application/useCases/Category/ListCategory";

export class CategoryController {
    constructor(
        private createCategory: CreateCategory,
        private listCategories: ListCategories
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
    }    public async handleListCategories(req: Request, res: Response){
        try {
            const categories = await this.listCategories.execute();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}