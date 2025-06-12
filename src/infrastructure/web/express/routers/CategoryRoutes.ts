import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";

const router = Router();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Cria uma nova categoria para classificação de transações
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryInput'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   description: ID da categoria criada
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/category', (req: Request, res: Response) => ContainerFactory.createContainer().categoryController.handleCreateCategory(req, res));

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista com todas as categorias cadastradas no sistema
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   description: Lista de categorias
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID da categoria
 *                       name:
 *                         type: string
 *                         description: Nome da categoria
 *                       userId:
 *                         type: string
 *                         description: ID do usuário proprietário da categoria
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/category', (req: Request, res: Response) => ContainerFactory.createContainer().categoryController.handleListCategories(req, res));
export default router;