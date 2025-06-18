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

/** * @swagger
 * /monthly-goals/{userId}:
 *   get:
 *     summary: Busca metas mensais do usuário
 *     description: Retorna todas as metas mensais de um usuário específico
 *     tags: [Monthly Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário para buscar suas metas mensais
 *     responses:
 *       200:
 *         description: Metas mensais encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonthlyGoal'
 *       404:
 *         description: Usuário não encontrado ou sem metas mensais
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
router.get('/monthly-goals/:userId', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().monthlyGoalController.handleFindUserMonthlyGoal(req, res));

/** * @swagger
 * /monthly-goals/{id}:
 *   put:
 *     summary: Atualiza uma meta mensal
 *     description: Atualiza uma meta mensal de gastos pelo seu ID
 *     tags: [Monthly Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da meta mensal a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorLimite:
 *                 type: number
 *                 format: float
 *                 example: 2000.00
 *                 description: Novo valor limite para gastos no mês
 *               mes:
 *                 type: integer
 *                 example: 7
 *                 description: Novo mês da meta (1-12)
 *               ano:
 *                 type: integer
 *                 example: 2025
 *                 description: Novo ano da meta
 *     responses:
 *       200:
 *         description: Meta mensal atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                   description: ID da meta mensal atualizada
 *                 message:
 *                   type: string
 *                   example: "Monthly goal updated successfully"
 *                   description: Mensagem de sucesso
 *       400:
 *         description: Dados inválidos na requisição
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Meta mensal não encontrada
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
router.put('/monthly-goals/:id', authMiddleware, (req: Request, res: Response) => ContainerFactory.createContainer().monthlyGoalController.handleUpdateMonthlyGoal(req, res));
export default router;