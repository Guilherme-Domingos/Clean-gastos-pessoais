import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";

const router = Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário no sistema
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserOutput'
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email já está em uso
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
 *
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista com todos os usuários cadastrados no sistema
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListUserOutput'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/user', (req: Request, res: Response) => ContainerFactory.createContainer().userController.handleCreateUser(req, res));

router.get('/user', (req: Request, res: Response) => ContainerFactory.createContainer().userController.handleListUsers(req, res));
export default router;