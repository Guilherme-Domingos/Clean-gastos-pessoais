import { Router, Request, Response } from "express";
import { ContainerFactory } from "../../../../app/ContainerFactory";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/** * @swagger
 * /monthly-goals:
 *   post:
 *     summary: Cria uma nova meta mensal
 *     description: Cria uma nova meta mensal de gastos para um usuário específico
 *     tags: [Monthly Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMonthlyGoalInput'
 *     responses:
 *       201:
 *         description: Meta mensal criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateMonthlyGoalOutput'
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Já existe uma meta para o mês/ano especificado
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
router.post('/monthly-goals', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().monthlyGoalController.handleCreateMonthlyGoal(req, res));

export default router;