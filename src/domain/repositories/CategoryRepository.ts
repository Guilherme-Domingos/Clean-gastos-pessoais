import { Category } from '../entities/Category';

export interface CategoryRepository {
    findById(id: string): Promise<Category | null>;
    findByUserId(userId: string): Promise<Category[]>;
    save(category: Category): Promise<void>;
    update(category: Category): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Category[]>;
}